const mongoose = require("mongoose")

function connectTODb(){
    return mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database");     
    })
}
module.exports = connectTODb;