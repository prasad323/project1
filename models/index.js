const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Contact = require('./contact');

module.exports = {
  Contact,
  sequelize
};
