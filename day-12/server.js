require('dotenv').config()
const connectTODb= require("./src/config/database")
const app = require("./src/app")

connectTODb()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})