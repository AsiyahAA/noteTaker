const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3000;
const db = require("./Develop/db/db.json")

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/home", (req,res)=>{
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "./notes.html"))
})

app.get("/api/notes", (req,res)=>{
    res.json(db)
})

app.post("/api/notes", (req,res)=>{ 
    const data = req.body;
    db.push(data);

    fs.writeFile('./db/db.json', JSON.stringify(db), () => {
        console.log("Added new note!")
        res.json(db) 
    })


})

app.listen(PORT, ()=>{
    console.log("server connected to port " + PORT);
})

