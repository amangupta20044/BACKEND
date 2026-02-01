const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
    try {
        const { title, description ,age} = req.body;

        const note = await noteModel.create({
            title,
            description,
            age
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
app.get("/notes", async (req, res) => {
    try {
        const notes = await noteModel.find();

        res.status(200).json({
            message: "All notes fetched successfully",
            total: notes.length,
            notes: notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes",
            error: error.message
        });
    }
});


module.exports = app;
