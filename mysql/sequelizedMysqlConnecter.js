const { Sequelize, DataTypes, Model} = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 300,
    idle: 30000
  }
})

module.exports = sequelize;