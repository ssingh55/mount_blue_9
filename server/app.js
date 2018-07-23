var express = require("express");
var app = express();
var port = 3000;
var path = require('path');
// var client = path.resolve('../src');

app.use(express.static(path.resolve('../src')));
app.use(express.static(path.resolve('../dist')));
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('index.html'));
})

app.listen(port,()=>{
    console.log('listening on port '+port)
})