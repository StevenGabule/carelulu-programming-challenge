const Todo = require('../models/todo.model')
const asyncHandler = require('express-async-handler')

const newTodo = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const todo = await Todo.create({...req.body, userId});
    res.status(201).json(todo);
  } catch (e) {
    console.log(e)
    res.status(500).json({message: 'Failed to create todo.'});
  }
})

const allTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.findAll({
    where: {
      userId: req.user.id
    }
  });
  res.json(todos);
})

const oneTodos = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      res.status(404).json({message: 'Todo not found.'});
    } else {
      res.json(todo);
    }
  } catch (error) {
    res.status(500).json({message: 'Failed to fetch todo.'});
  }
})

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({message: 'Todo not found.'});
    }

    const [updatedRowsCount] = await Todo.update(req.body, {
      where: {id: req.params.id}
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({message: 'Todo not found.'});
    } else {
      const todo = await Todo.findByPk(req.params.id);
      res.json(todo);
    }
  } catch (error) {
    res.status(500).json({message: 'Failed to update todo.'});
  }
})

const removeTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({message: 'Todo not found.'});
    }

    const deletedRowsCount = await Todo.destroy({
      where: {id: req.params.id}
    });

    if (deletedRowsCount === 0) {
      res.status(404).json({message: 'Todo not found.'});
    } else {
      res.json({message: 'Todo deleted successfully.'});
    }
  } catch (error) {
    res.status(500).json({message: 'Failed to delete todo.'});
  }

})

module.exports = {newTodo, allTodos, oneTodos, updateTodo, removeTodo}
