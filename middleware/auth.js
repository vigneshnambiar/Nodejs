const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authorization = (req,res,next)=>{
const auth = req.headers.authorization
    //console.log(auth);

    if(!auth || !auth.startsWith('Bearer ')){
        throw new CustomAPIError('Session experied',404)
    }

    const ver = auth.split(' ')[1]
    
    //console.log(verify);

    try {
        const verify = jwt.verify(ver,process.env.JWT)
        const {username,id} = verify
        req.user = {username, id}
        //console.log(req.user);
        next()
    } catch (error) {
        throw new CustomAPIError('Error in validation',404)
    }
}

module.exports = authorization