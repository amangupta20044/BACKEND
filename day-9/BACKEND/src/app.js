// eska kam hota hai server create karna

const express = require("express")

const noteModel = require('./models/notes.model')

const app = express()

const cors = require('cors')

const path = require("path")

app.use(express.json())// middlewaare

app.use(cors())

app.use(express.static("./public"))// Ye middleware frontend ki files (HTML, CSS, JS, images) ko browser tak pahunchata hai.

app.post('/api/notes',async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created sexsexfully",
        note
    })
})
app.get('/api/notes',async(req,res)=>{
    const notes =await noteModel.find()

    res.status(200).json({
        message:"notes fetched successfully",
        notes
    })
})
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "note not found"
            });
        }

        res.status(200).json({
            message: "note deleted successfully",
            note
        });

    } catch (error) {
        res.status(500).json({
            message: "invalid id",
            error: error.message
        });
    }
});
app.patch('/api/notes/:id', async (req, res) => {
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            req.body,          // 👈 update anything sent
            {
                new: true,     // return updated data
                runValidators: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "note not found"
            });
        }

        res.status(200).json({
            message: "note updated successfully",
            note: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            message: "update failed",
            error: error.message
        });
    }
});

app.use('*name',(req,res)=>{// *name-- ye un api ko handle karega jisko tm nahi create kiye ho
    res.sendFile(path.join(__dirname,"..","/public/index.html"));
})

module.exports = app;