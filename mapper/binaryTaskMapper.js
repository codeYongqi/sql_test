const Task = require("../models/Task")
const { Op } = require("sequelize");
const EmptyObjectError = require('../error/EmptyObjectErrror');
const SubTask = require("../models/Subtask");

const findByCustomerIdAndId = async function selectByCusAndId(customerId , idArr) {
	// when given arguments are invalid

	let options = {}

	options.attributes = [
	['id', 'taskId'],
	'taskStatus',
	'createdTime',
	'sourceId',
	'targetType',
	'target',
	];

	options.include = [{
			model: SubTask,
			attributes: ['taskStatus','finishedTime'],
			required: false,
			where: {
				customerId
			}
		}];

	options.where = {
			customerId,
			id: {
				[Op.or]: idArr
			},
	};

	options.limit = 65535;

	let returnTask = await Task.findAll(options);
	return returnTask.map(x => x['dataValues'])
}