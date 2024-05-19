require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('re6789gtre78564h').then((task)=>{
//     console.log(task)
//     return task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

deleteTaskAndCount = async(id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

deleteTaskAndCount('re6789gtre78564h').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})