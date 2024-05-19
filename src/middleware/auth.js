const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token}) //find id that has token that's still valid intokens array

        if(!user){
            throw new Error
        }
        req.token = token
        req.user = user //give this to route handler coz there's no need to fetch user again as it does this
        next()
    } catch(e){
        res.status(401).send('Please authenticate!')
    }
}

module.exports = auth