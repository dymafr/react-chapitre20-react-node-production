const router = require('express').Router();
const Todos = require('../database/models/todo.model');
const util = require('util');

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todos.find({}).exec();
    res.json(todos);
  } catch(e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newTodo = new Todos({ ...body });
    const todo = await newTodo.save();
    res.json(todo);
  } catch(e) {
    next(e);
  }
})

router.put('/', async (req, res, next) => {
  try {
    const body = req.body;
    const todo = await Todos.findOneAndUpdate({ _id: body._id }, { $set: {
      name: req.body.name,
      done: req.body.done
    }}, { new: true }).exec()
    res.json(todo)
  } catch(e) {
    next(e);
  }
})

router.delete('/:todoId', async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    await Todos.findByIdAndDelete(todoId).exec();
    res.json('ok');
  } catch(e) {
    next(e);
  }
})

module.exports = router;