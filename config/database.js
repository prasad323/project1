const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql', 'root', 'pass@123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
