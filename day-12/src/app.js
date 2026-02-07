const express = require("express")
const cookieparser=require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const app = express()


app.use(express.json())

app.use(cookieparser())

app.use("/api/auth",authRouter)// api/auth is a sting that use to asses the register api




module.exports = app;