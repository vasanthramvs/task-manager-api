require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('rt546378ythu8769hy', {age:15}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:15})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const updateAgeAndCount = async(id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('rt546378ythu8769hy', 1).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})