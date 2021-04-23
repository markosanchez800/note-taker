const express = require('express');
const path = require('path');
const fs = require('fs')
const {v4:uuidv4} = require('uuid');
//const mainDirectory = path.join(__dirname,'/public');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static('public'));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});
//why is app not registering notes or db file?? figure out
app.get("/api/notes",function(req,res){
    res.sendFile(path.join(__dirname,'/db/db.json'));
});

app.post("/api/notes",function(req,res){
    var newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('./db/db.json',function(err,data){
        if(err)throw(err);
        var allNotes = JSON.parse(data);
        allNotes.push(newNote);
        fs.writeFile('./db/db.json',JSON.stringify(allNotes),function(err,data){
            if(err)throw(err);
            console.log('Note Saved!');
            res.json(newNote);
        });
    });
});





























app.listen(PORT, ()=>console.log(`App listening on PORT ${PORT}`))