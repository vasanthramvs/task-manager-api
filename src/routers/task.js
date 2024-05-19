const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router

router.post('/tasks', async(req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        Owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(400).send(e)
    }
})


// app.get('/tasks', (req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.send(tasks)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

router.get('/tasks', auth, async(req,res)=>{
    try{
        //const tasks = await Task.find({})
        // const tasks = await Task.find({ owner: req.user._id})  first way

        //GET /tasks?completed=true
        //GET /tasks?limit=10&skip=0
        //GET /tasks?sortBy=createdAt:desc
        const match = {}
        const sort = {}

        if(req.query.completed) {
            match.completed = req.query.completed === 'true' // comparing the string
        }

        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                // limit: 2    refactoring this code as am gonna get this from user
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort //: {
                    // createdAt: 1,   // ascending means 1, descending means -1
                    // completed: 1    // 1 means false will be first, -1 means true will be sorted first
                    // now instead of hardcoded we are gonna fetch from user using sort value initiated above
                //}
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

// app.get('/tasks/id', (req,res)=>{
//     const iD = req.params.id
//     Task.findById(iD).then((task)=>{
//         if(!task){
//             return res.status(400).send()
//         }
//         res.send(task)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

router.get('/tasks/id', auth, async (req,res)=>{
    const iD = req.params.id
    try{
        //const task = await Task.findById(iD)
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(400).send
        }
        res.send(task)
    } catch (e) {
        res.send(500).send()
    }
})

router.patch('/tasks/id', auth, async(req,res)=>{
    const updates = Object.keys(res.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error:'Update is invalid'})
    }
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        //const task = await Task.findByIdAndUpdate(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        
        if(!task){
            return res.status(400).send()
        }

        updates.forEach((update)=>Task[update]=req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        return res.status(404).send(e)
    }
})


router.delete('/tasks/id', auth, async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports=router