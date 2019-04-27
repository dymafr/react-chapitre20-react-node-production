const express = require('express');
const todos = require('./todo.api');

const router = express.Router();

router.use('/todos', todos);

module.exports = router;