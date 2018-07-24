const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: [true,'text Field is required']
    },
    key: {
        type: String
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

const todoModule = mongoose.model('todos',todoSchema);

module.exports = todoModule;