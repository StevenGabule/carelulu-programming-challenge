const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const {newTodo, allTodos, updateTodo, removeTodo, oneTodos: oneTodo} = require("../controller/todo.controller");


router.post('/', isAuthenticated, newTodo);
router.get('/', isAuthenticated, allTodos);
router.get('/:id', isAuthenticated, oneTodo);
router.put('/:id', isAuthenticated, updateTodo);
router.delete('/:id', isAuthenticated, removeTodo);

module.exports = router;