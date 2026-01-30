const mongoose = require("mongoose");

function connectToDb() {
    mongoose
        .connect(
            "mongodb+srv://aman:eJgZt3bq45pm4YTR@cluster0.chwchw8.mongodb.net/day-7"
        )
        .then(() => {
            console.log("connected to database");
        })
        .catch((err) => {
            console.log("db error:", err);
        });
}

module.exports = connectToDb;
