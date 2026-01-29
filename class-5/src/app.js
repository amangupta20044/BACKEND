const express = require("express");

const app = express();

// 🔥 middleware MUST be before routes
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server working");
});

// NOTES ROUTE
app.post("/notes", (req, res) => {
    res.json({
        message: "POST route working",
        body: req.body
    });
});

module.exports = app;
