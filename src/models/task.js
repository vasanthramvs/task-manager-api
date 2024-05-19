const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // type exactly the model name that u want to relate to, this is the minimal code provided by nodejs to establish connection btwn two models
    }
}, {
    timestamps: true
})
const Task = mongoose.model('Task', taskSchema)

module.exports= Task
