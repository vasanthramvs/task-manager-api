const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeMail, sendCancelationMail } = require('../emails/accounts')
const router = new express.Router

// app.post('/users', (req,res)=>{
//     // console.log(req.body)
//     // res.send('testing!')
//     const user = new User(req.body)

//     user.save().then(()=>{
//         res.send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//         //res.send(e)
//     })
// })

// redone using async, await

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        sendWelcomeMail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() // eventho the user has a token while signing up, again here he receives a fresh token for logging in for security reason
        // we are using user and not User model for token bcoz we are generating token for a specific user and not the model
        //res.send({user, token})
        //res.send({user: user.getPublicProfile(), token}) //now we have to use manually getPublicProfile in all, so what we can do is use toJSON method in models(refer ther it will get the same job done)
        res.send({user, token})
        // res.send actually stringifies the JSON object, so we use toJSON method to manipulate
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()

        res.send()
    } catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try {
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e) {
        res.status(500).send()
    }
}) 

// app.get('/users', (req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })

router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user)
})

// app.get('/users/:id', (req,res)=>{
//     const _id = req.params.id
//     User.findById(_id).then((user)=>{
//         if(!user){
//             return res.status(400).send()
//         }
//         res.send(user)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

// we can remove this as we should not allow users to see others info by id
// router.get('/users/:id', async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// router.patch('/users/id', async(req, res)=>{
//     const updates = Object.keys(res.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation =updates.every((update)=>allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error:'Invalid updates!'})
//     }
//     try{
//         const user = await User.findByIdUpdate(req.params.id)

//         updates.forEach((update)=> user[update] = req.body[update])
//         // updates.forEach((update)=>{
//         //     user[update] = req.body[update]
//         // })
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}) //orelse instead req.body-->{name: 'Jessica'}
//         await user.save()
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e){
//         res.status(400).send(e)
//     }
// })

// realtering as we dont want to use like users/id 

router.patch('/users/me', auth, async(req, res)=>{
    const updates = Object.keys(res.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation =updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e){
        res.status(400).send(e)
    }
})


// router.delete('/users/id', async(req,res)=>{
//     try{
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })


// realtering as we dont want to use like users/id 

router.delete('/users/me', auth, async(req,res)=>{ //as we have auth we can use req.user from auth, we cant use standalone user as we romved users/id
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelationMail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e){
        res.status(500).send(e)
    }
})

const upload = multer({
    //dest: 'avatars',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match('/\.(jpg|jpeg|png)$/')){
            return cb(new Error('Upload an image'))
        }
        cb(undefined, true)
    }

})
// router.post('/users/me/avatars', upload.single('avatar'), (req,res)=>{
// res.send()
// })

router.post('/users/me/avatars', auth, upload.single('avatar'), async(req,res)=>{
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatars', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('users/:id/avatar', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch(e){
        res.status(404).send()
    }
})

module.exports=router