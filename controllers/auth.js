const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequestError = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
//const { BadRequestError } = require('../../final/errors')

const register = async (req,res)=> {
    //console.log(req.body);
    //const {name,password,email} = req.body
    /*if(!name || !password || !email){
        throw new BadRequestError('Please Enter all the values in given fields')
    }*/
    const user = await User.create({...req.body})
    //sending mail to the users once registered
    const sendEmailEthereal = async (req, res) => {
        let testAccount = await nodemailer.createTestAccount();
      
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'marlene.legros@ethereal.email',
            pass: 'va4q5BKKtry7aq58Gv',
          },
        });
      
        let info = await transporter.sendMail({
          from: '"Coding Addict" <codingaddict@gmail.com>',
          to: user.email,
          subject: 'Hello',
          html: '<h2>Sending Emails with Node.js</h2>',
        });
        console.log(user.email);
        console.log('Email sent:', info.response);
      };

    const token = user.createjwt()
    //const token = jwt.sign({userID: user._id,name: user.name},'secrettest',{expiresIn:"30d"})
    // await User.deleteMany()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

const login = async (req,res)=> {
    const {email,password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please enter the correct email and password')
    }
    const user = await User.findOne({email})
    const iscorrect = await user.comparepassword(password)
    //console.log(iscorrect);
    if(!iscorrect){
        throw new BadRequestError('Please enter the valid password')
    }

    const token = user.createjwt()

    res.status(StatusCodes.OK).json({user: {user: user.name}, token})
}

module.exports = {
    register,login
}