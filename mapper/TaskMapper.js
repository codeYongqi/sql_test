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

async function test () {
	let res = await findByCustomerIdAndId('5206e8fc-bb86-4119-a9e4-5aed13483ea7',['00000001']);
	console.log(res);
}

 // test();
module.exports = { findByCustomerIdAndId };
