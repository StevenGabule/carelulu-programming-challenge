const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler')
const User = require('../models/user');
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const {newUser, allUsers, oneUser, updateUser, removeUser} = require("../controller/user.controller");
const {login, logout} = require("../controller/auth.controller");

// Create a new user
router.post('/', newUser);

// Get all users
router.get('/', allUsers);

// Get user by ID
router.get('/:id', oneUser);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', removeUser);

// auth route
router.post('/login', login)
router.post('/logout', logout)

router.post('/profile', isAuthenticated, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(401).json({message: 'Account not found.'});
  }

  res.json({status: 'Success', user});
}));

module.exports = router;