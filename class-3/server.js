const express=require("express")

const app = express()

app.use(express.json())// middleware hai

const notes =[]

app.post("/notes",(req,res)=>{
    console.log(req.body);
    
    res.send("note created")
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log("app is running in port 3000");
    
})