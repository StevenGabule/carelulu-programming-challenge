const express = require('express');
const router = express.Router();
const {newUser, allUsers, oneUser, updateUser, removeUser} = require("../controller/user.controller");
const {login, logout} = require("../controller/auth.controller");
const isAuthenticated = require("../middlewares/isAuthenticated.middleware");
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model');

// user route
router.post('/', newUser);
router.get('/', allUsers);
router.get('/:id', oneUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

// auth route
router.post('/login', login)
router.post('/logout', logout)

router.post('/profile', isAuthenticated, asyncHandler(async(req, res) => {
  const user = await User.findByPk(req.user.id);
  if(!user) {
    return res.status(401).json({ message: 'Account not found.' });
  }

  res.json({ status: 'Success', user });
}));

module.exports = router;