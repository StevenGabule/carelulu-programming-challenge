const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async(req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 * 3 // 3d
    });

    res.json({
      status: 'success',
      message: 'Login success',
      _id: user.id,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

const logout =  async(req, res) => {
  res.cookie('token', '', {maxAge: 1});
  res.status(200).json({message: 'Logged out successfully.'})
}

module.exports = {login, logout}