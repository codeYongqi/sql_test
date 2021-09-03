const { Model, DataTypes } = require('sequelize');
const sequelize = require('../mysql/sequelizedMysqlConnecter');

class Target extends Model {}
Target.init({
  id: {
    type: DataTypes.CHAR(8),
    primaryKey: true
  },
  target: {
    type: DataTypes.JSON,
  }
}, {
  sequelize,
  modelName: 'Target',
  tableName: 'json_test_50w',
  underscored: true,
  timestamps: false,
})
module.exports = Target;