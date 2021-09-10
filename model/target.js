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
  },
  targetString: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'Target',
  tableName: 'test',
  underscored: true,
  timestamps: false,
})
module.exports = Target;