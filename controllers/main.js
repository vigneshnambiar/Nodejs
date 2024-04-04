//const express = require('express')

const jwt =require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res)=> {
    const {username,password} = req.body
    //console.log(user,password);
    //res.status(200).json({msg:'The query is working'})

    if(!username || !password){
        throw new CustomAPIError ('The given userID or Password is wrong',400)
    }

    const id = new Date().getDate()

    const token= jwt.sign({username,id},process.env.JWT,{expiresIn:'30d'})
    //console.log(tokens);

    //res.status(200).json({msg:'The query is working'})
    res.status(200).json({ msg: 'user created', token })
} 

const dashboard = async (req,res)=> {

    

    const decode = Math.floor(Math.random()*100)
    //res.status(200).json({msg:`The dashboard has random data ${random}`})
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${decode}`,
      })
}


module.exports = {login,dashboard}