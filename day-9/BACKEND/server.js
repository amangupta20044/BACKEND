// eska kam server ko start karna aur database se create karna

// const { config } = require('dotenv');
const app = require('./src/app')
require('dotenv').config()

const connectTODb = require('./src/config/database')

connectTODb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");

})