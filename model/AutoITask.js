const sequelize = require('../resource/sequelize/mysqlSqlConnecter') 
const { DataTypes, Model } = require('sequelize');

class AutoITask extends Model {}

AutoITask.init({
	priId: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	customerId: {
		type: DataTypes.CHAR(36),
	},
	id: {
		type: DataTypes.CHAR(8),
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
	modelName: 'AutoITask',
	tableName: 'task_autoi_30w',
	underscored: true,
	timestamps: false,
})


module.exports = AutoITask;




