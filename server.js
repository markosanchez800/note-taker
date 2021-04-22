const express = require('express');
const path = require('path');
const fs = require('fs');
const mainDirectory = path.join(__dirname,'/public');

const app = express();
const PORT = 5600;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static('public'));

app.get('/',(req,res)=>res.sendFile(path.join(mainDirectory,'index.html')));

app.get("/notes",(req,res)=>res.sendFile(path.join(mainDirectory,'notes.html')));
//why is app not registering notes or db file?? figure out
app.get('/api/notes',(req,res)=>res.sendFile(path.join(__dirname,'/db/db.json')));

app.get('/api/notes/:id',function(req,res){
    JSON.parse(fs.readFileSync("./db/db.json", 'utf8'));
    res.json(savedNotes[Number(req.params.id)]);
});





























app.listen(PORT, ()=>console.log(`App listening on http://localhost${PORT}/`));