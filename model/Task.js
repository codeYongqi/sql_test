const sequelize = require('../resource/sequelizedMysqlConnecter') 
const { DataTypes, Model } = require('sequelize');

class Task extends Model {}

Task.init({
	customerId: {
		type: DataTypes.CHAR(36),
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
	modelName: 'Task',
	tableName: 'task_50w',
	underscored: true,
	timestamps: false,
})


module.exports = Task




