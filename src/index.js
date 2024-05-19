const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// app.use((req,res,next)=>{
    
// })

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const multer = require('multer')
const upload = multer({
    dest: 'images',  // file name where it gng to be saved
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){  // cb accepts two arguments: first is error, second is boolean for the file should be accepted or not
        if (!file.originalname.endsWith('.pdf')) { // for doc, docx -> if (!file.originalname.match(/\.(doc|docx)$/))
            return cb(new Error('Upload a pdf'))
        }
        cb(undefined, true)
    }
})
// app.post('/upload', upload.single('upload'), (req,res)=>{ // upload is the file, also the key we are gonna enter in postman
//     res.send()
// })

// const errorMiddleware = (req, res, next) =>{
//     throw new Error('From my middleware')
// }

// router.post('/upload', errorMiddleware, (req,res,next)=>{
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message})
// })

// now we can remove errorMiddlewareas we dont need that and alter the code

router.post('/upload', upload.single('upload'), (req,res,next)=>{
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message})
})

// const router = new express.Router
// router.get('/test', (req,res)=>{
//     res.send('This is from another router')
// })
// app.use(router)

// // app.post('/users', (req,res)=>{
// //     // console.log(req.body)
// //     // res.send('testing!')
// //     const user = new User(req.body)

// //     user.save().then(()=>{
// //         res.send(user)
// //     }).catch((e)=>{
// //         res.status(400).send(e)
// //         //res.send(e)
// //     })
// // })

// // redone using async, await

// app.post('/users', async (req,res)=>{
//     const user = new User(req.body)
//     try{
//         await user.save()
//         res.status(201).send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// // app.get('/users', (req,res)=>{
// //     User.find({}).then((users)=>{
// //         res.send(users)
// //     }).catch((e)=>{
// //         res.status(500).send(e)
// //     })
// // })

// app.get('/users', async (req,res)=>{
//     try{
//         const users = await User.find({})
//         res.send(users)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })

// // app.get('/users/:id', (req,res)=>{
// //     const _id = req.params.id
// //     User.findById(_id).then((user)=>{
// //         if(!user){
// //             return res.status(400).send()
// //         }
// //         res.send(user)
// //     }).catch((e)=>{
// //         res.status(500).send()
// //     })
// // })

// app.get('/users/:id', async(req,res)=>{
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

// app.patch('/users/id', async(req, res)=>{
//     const updates = Object.keys(res.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation =updates.every((update)=>allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error:'Invalid updates!'})
//     }
//     try{
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}) //orelse instead req.body-->{name: 'Jessica'}
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e){
//         res.status(400).send(e)
//     }
// })


// app.delete('/users/id', async(req,res)=>{
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




// app.post('/tasks', (req,res)=>{
//     const task = new Task(req.body)

//     task.save().then(()=>{
//         res.status(201).send(task)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })

// })

// app.post('/tasks', async(req,res)=>{
//     const task = new Task(req.body)
//     try{
//         await task.save()
//         res.status(201).send(task)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })


// // app.get('/tasks', (req,res)=>{
// //     Task.find({}).then((tasks)=>{
// //         res.send(tasks)
// //     }).catch((e)=>{
// //         res.status(500).send()
// //     })
// // })

// app.get('/tasks', async(req,res)=>{
//     try{
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch(e) {
//         res.status(500).send(e)
//     }
// })

// // app.get('/tasks/id', (req,res)=>{
// //     const iD = req.params.id
// //     Task.findById(iD).then((task)=>{
// //         if(!task){
// //             return res.status(400).send()
// //         }
// //         res.send(task)
// //     }).catch((e)=>{
// //         res.status(500).send()
// //     })
// // })

// app.get('/tasks/id', async (req,res)=>{
//     const iD = req.params.id
//     try{
//         const task = await Task.findById(iD)
//         if(!task){
//             return res.status(400).send
//         }
//         res.send(task)
//     } catch (e) {
//         res.send(500).send()
//     }
// })

// app.patch('/tasks/id', async(req,res)=>{
//     const updates = Object.keys(res.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
//     if (!isValidOperation){
//         return res.status(400).send({error:'Update is invalid'})
//     }
//     try{
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
//         if(!task){
//             return res.status(400).send()
//         }
//         res.send(task)
//     } catch (e) {
//         return res.status(404).send(e)
//     }
// })


// app.delete('/tasks/id', async(req,res)=>{
//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })


app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})


// const bcrpt = require('bcryptjs')

// const myFunction = async()=>{
//     const password = 'Red12345!'
//     const hashedPassword = await bcrpt.hash(password, 8)

//     console.log(password, hashedPassword)
//     const isMatch = await bcrpt.compare(password, hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

// hashing -> one way algorithm that can't be decoded ex:Red12345! $2a$08$G4CR09PjQ6qyK3JFep5z9O03R0MxC1lvoL0GUbGD961e5841CTWRG
// encryption -> two way algorithm that can be decoded ex: Vasanth -> rthcfi78nad -> Vasanth

// const jwt = require('jsonwebtoken')
// const myFunction = async()=>{
//     const token = jwt.sign({_id:'abc123'}, 'thisismynewcourse', {expiresIn:'7 days'})
//     console.log(token)
//     //jwt has three parts separated by period. First is abot jwt algorithm. second is body which contains the info we provided, in our case it's _id. Last is signature to verify the token.

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }
// myFunction()

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))

// find who owns the task
const Task = require('./models/task')
const User = require('./models/user')

const mains = async()=>{
    const task = await Task.findbyId('ed7653il9876we56') // task id (generated by mongodb automatically)
    await task.populate('owner').execPopulate()
    console.log(task.owner)
}

mains()



const main = async()=>{
    const user = await User.findbyId('th5687642gdyujh') // owner id
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
main()
