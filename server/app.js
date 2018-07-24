const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoModule = require('../module/todoModule');

app.use(express.static(path.resolve('../src')));
app.use(express.static(path.resolve('../dist')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/tododb', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//send the index file
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
})

//get the data
app.get('/api/todos', (req, res) => {
    todoModule.find({}).then(function (data) {
        res.send(data)
    })
})

//add a new data
app.post('/api/todos', async (req, res) => {
    console.log(req.body)
    // var todo = new todoModule(req.body);
    // todo.save();
    var bodyData = await req.body;
    todoModule.create(bodyData).then(function (data) {
        res.send(data);
    });
});

//delete a data
app.delete('/api/todos/:id', (req, res) => {
    todoModule.findOneAndRemove({ key: req.params.id }).then(function (data) {
        res.send(data)
        // res.send({type:'DELETE'})
    })
})

//update a data
app.put('/api/todos/:id', async (req, res) => {
    // console.log(req.body[0].isDone)
    var bodyData = await req.body.isDone;
    todoModule.findOneAndUpdate({ key: req.params.id }, {$set:{isDone:bodyData}}).then(function () {
        todoModule.findOne({ key: req.params.id }).then(function (data) {
            // console.log(data)
            res.send(data)
        })
    })
})

//start listening on the port
app.listen(port, () => {
    console.log('listening on port ' + port)
})