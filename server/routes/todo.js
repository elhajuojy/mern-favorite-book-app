var mongoose = require('mongoose');
const router = require('express').Router();
let todoModel = require('../models/todo.js');


router.route('/').get((req, res) => {
    todoModel.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const img = req.body.img;

    const newTodo = new todoModel({
        title,
        content,
        img
    });

    newTodo.save()
        .then(() => res.json('todo added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').post((req, res) => {
    var id = mongoose.Types.ObjectId(req.body._id);

    todoModel.findByIdAndDelete(id)
        .then(() => res.json('todo Deleted!!!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;