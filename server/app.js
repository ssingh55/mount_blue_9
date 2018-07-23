const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
// const client = path.resolve('../src');
const mongoose = require('mongoose');
const todoModule = require('../module/todoModule');

app.use(express.static(path.resolve('../src')));
app.use(express.static(path.resolve('../dist')));
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/tododb',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
})

app.post('/api/todos', (req, res) => {
    console.log(req.body)
    // var todo = new todoModule(req.body);
    // todo.save();
    todoModule.create(req.body).then(function(data){
        res.send(data);
    });
});

app.listen(port, () => {
    console.log('listening on port ' + port)
})