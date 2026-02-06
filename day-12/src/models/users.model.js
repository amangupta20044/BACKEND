const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : String,
    email: {
    type: String,
    unique: [true, "email is already exist"]
},
    password:String
})
const userModel = mongoose.model("users",userSchema)// operation perform karne ke liye user ke uper, schema for formate batane ke liye

module.exports= userModel;