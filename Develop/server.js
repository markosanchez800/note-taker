const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5500;

app.use(express.urlencoded({extended:true}));
app.use(express.json());