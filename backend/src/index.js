require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');
const {errorHandler} = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// add route for swagger document API
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/todos', todoRoutes);

const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});