const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const todoSchema = new Schema({
    content: { type: String, required: true, },
    title: { type: String, required: true, },
    img: { type: String, required: true, },
}, {
    timestamps: true,
});

const todoModel = mongoose.model('todos', todoSchema);

module.exports = todoModel;