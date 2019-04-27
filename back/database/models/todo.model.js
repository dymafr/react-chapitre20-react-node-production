const mongoose = require('mongoose');
const schema = mongoose.Schema;

const todoSchema = schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false }
}, {
  timestamps: true
})

const Todos = mongoose.model('todos', todoSchema);

module.exports = Todos;