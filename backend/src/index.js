require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const {errorHandler} = require("./middlewares/error.middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// add route for swagger document API
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});