const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MANGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     }, 
//     email:{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate(value){
//             if(!value.includes('password')){
//                 throw new Error('Password cannot contain "password"')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value<0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

const me = new User({
    name: 'Andrew',
    email: 'andrew@gmail.com',
    password: 're3233ui',
    age: 27
})

me.save().then((me)=>{
    console.log(me)
}).catch((error)=>{
    console.log(error)
})



const Task = mongoose.model('Task', {
    description:{
        type: String,
        require: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: 'Clean house',
    completed: true
})

task.save().then((task)=>{
    console.log(task)
}).catch((error)=>{
    console.log(error)
})