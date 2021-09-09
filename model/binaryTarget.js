const sequelize = require('../resource/sequelizedMysqlConnecter') 
const { DataTypes, Model } = require('sequelize');

class BinaryTask extends Model {}

BinaryTask.init({
	customerId: {
		type: DataTypes.BLOB,
		primaryKey: true,
	},
	id: {
		type: DataTypes.CHAR(8),
		primaryKey: true
	},
	targetType: DataTypes.INTEGER,
	target: DataTypes.STRING(8192),
	displayTarget: DataTypes.TEXT,
	details: DataTypes.JSON,
	taskStatus: DataTypes.INTEGER,     
	action: DataTypes.INTEGER,     
	retryCount: DataTypes.INTEGER,     
	createdTime: DataTypes.DATE,    
	executedTime: DataTypes.DATE,    
	finishedTime: DataTypes.DATE,    
	errorCode: DataTypes.INTEGER,     
	taskCount: DataTypes.INTEGER,     
	productCode: DataTypes.INTEGER,     
	accountName: DataTypes.STRING(128),
	sourceName: DataTypes.INTEGER,
	sourceId: DataTypes.STRING(36),
	description: DataTypes.STRING(10000),
}, {
	sequelize,
	modelName: 'BinaryTask',
	tableName: 'task_binary',
	underscored: true,
	timestamps: false,
})


module.exports = BinaryTask;




