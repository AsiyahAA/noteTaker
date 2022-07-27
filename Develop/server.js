const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json")

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/home", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req,res)=>{
    res.json(db)
})

app.post("/api/notes", (req,res)=>{ 
    // save whatever the browser sent us and then save it to the db.json
    const data = req.body;
    db.push(data);

    fs.writeFile('./db/db.json', JSON.stringify(db), () => {
        console.log("Added new note!")
        res.json(db) 
    })


})

app.listen(PORT, ()=>{
    console.log("server connected")
})

