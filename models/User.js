const mongoose = require('mongoose')
//const { use } = require('../routes/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const user = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Please enter the username'],
        minLenght:3,
        maxLenght:52
    },

    email:{
        type:String,
        require:[true, 'Please enter the Email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique:true
    },

    password:{
        type:String,
        require:[true, 'Please enter the Password'],
        minLenght:6
    }
}
)

user.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

user.methods.createjwt = function() {
    return jwt.sign({userID: this._id,name: this.name},process.env.SECRETE,{expiresIn:process.env.JWT_LIFE})
}

user.methods.comparepassword = async function(comparepass){
    const compare = await bcrypt.compare(comparepass,this.password)
    return compare
}

module.exports=mongoose.model('User',user)