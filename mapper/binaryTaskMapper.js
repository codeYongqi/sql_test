const { Op } = require("sequelize");
const BinaryTask = require("../model/binaryTarget");

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
		uuid: uuidParse.parse(customerId),
		id: {
			[Op.or]: idArr
		},
	};

	options.limit = 65535;

	console.log(options);
	let returnTask = await BinaryTask.findAll(options);
	return returnTask;
	// return returnTask.map(x => x['dataValues'])
}

async function test () {
	let res = await findByCustomerIdAndId('397FA1F131F442EAE74E599FC44EEFF9',['00000010']);
	console.log(res);
}

test();
