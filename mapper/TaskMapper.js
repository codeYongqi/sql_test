const { Op } = require("sequelize");
const Task = require("../model/Task");

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


 // test();
module.exports = { findByCustomerIdAndId };
