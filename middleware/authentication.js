const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticate = async (req,res,next)=> {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invlaid')
    }

    const auth = authHeader.split(' ')[1]
    
    try {
        const payload = jwt.verify(auth,process.env.SECRETE)
        req.user = { userID: payload.userID ,name:payload.name}
        //console.log(req.user);
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authenticated Invalid')
    }

}

module.exports = authenticate