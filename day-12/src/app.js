const express = require("express")

const authRouter = require("./routes/auth.routes")
const app = express()


app.use(express.json())

app.use("/api/auth",authRouter)// api/auth is a sting that use to asses the register api




module.exports = app;