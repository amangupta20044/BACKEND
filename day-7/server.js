const app = require("./src/app");
const connectToDb = require("./src/config/dataBase");

connectToDb();

app.listen(3000, () => {
    console.log("server running on port 3000");
});
