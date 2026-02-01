const mongoose = require("mongoose")

const noteSchema= new mongoose.Schema({
    title : String,
    description: String
})

const noteModel = mongoose.model("note", noteSchema)// crud op perform hota hai

module.exports = noteModel
