const express = require("express")
const fs = require("fs")
const path = require("path")
const db = require("./db/db.json")

const app = express()

const PORT = process.env.PORT || 3000;
app.use(express.json())

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))


app.get("/", (req,res)=>{
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

