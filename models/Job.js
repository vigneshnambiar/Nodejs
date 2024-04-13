const mongoose = require('mongoose')

const Job = new mongoose.Schema({
    company:{
        type:String,
        require:[true,'Please enter the company'],
        maxLength:50
    },
    position:{
        type:String,
        require:[true,'Please enter the position'],
        maxLength:150
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true,'Please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job',Job)