const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
    try {
        const { title, description } = req.body;

        const note = await noteModel.create({
            title,
            description
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating note",
            error: error.message
        });
    }
});

module.exports = app;
