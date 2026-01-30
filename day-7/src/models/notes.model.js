// eske andar schema banaya jat hai
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const noteModel = mongoose.model("Note", noteSchema);

module.exports = noteModel;
