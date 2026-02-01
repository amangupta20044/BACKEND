// eske andar schema banaya jat hai
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description:String,
    age: Number

});

const noteModel = mongoose.model("Note", noteSchema);

module.exports = noteModel;
