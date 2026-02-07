const express = require("express")
const userModel = require("../models/users.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        // check if email already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            })
        }
        const hash = crypto.createHash("md5").update(password).digest("hex")

        // create new user
        const user = await userModel.create({
            name,
            email,
            password:hash
        })


        // 🔐 CREATE TOKEN
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
        )
        res.cookie("jwt_token", token)

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        })

    } catch (error) {

        // MongoDB duplicate key error fallback
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        res.status(500).json({
            message: "Server error"
        })
    }
})
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "this is protected route"
    })
})
// controller for login
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not found this email address"
        })
    }
    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex");
    if (!isPasswordMatched) {
        return res.status(404).json({
            message: "invalid password"
        })
    }
    const token = jwt.sign({
        id : user._id,
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(401).json({
        message:"user logged In",
        user
    })
})

module.exports = authRouter
