const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = asyncHandler(async(req, res, next) => {
	console.log('req.cookies.token', req.cookies.token)
	if(req.cookies.token) {
		const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
		req.user = await User.findByPk(decoded.id);
		next();
	} else {
		return res.status(401).json({message: 'Unauthenticated.'})
	}
})

module.exports = isAuthenticated;