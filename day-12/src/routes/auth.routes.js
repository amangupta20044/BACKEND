const express  = require("express")
const userModel = require("../models/users.model")
const authRouter = express.Router()// app.js ke alawa kahi aur api create ke liye ham ye banate hai

authRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;

   const user = await userModel.create({
        name,email,password
    })
    res.status(201).json({
        message:"user registerd",
        user
    })
})
module.exports = authRouter