const Sequelize = require('sequelize');
const sequelize = require('../db');

const TodoModel = sequelize.define('todo', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    default: false
  },
});

module.exports = TodoModel;