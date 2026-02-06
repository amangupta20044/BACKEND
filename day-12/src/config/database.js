const mongoose = require("mongoose")

function connectTODb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log("database connection failed:", err)
    })  
}
module.exports = connectTODb;