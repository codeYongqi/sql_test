const { query } = require("./Mysql")
const { performance } = require('perf_hooks');

const selectTest = async function selectTest(time, uuid) {
	let maxCost = -1;
	let minCost = 3600;
	let averageCost = 0;
	let accurency = 0;
	//循环次数
	let count = time

	const rows = await query(`select uuid from customer_uuid where id = ${(uuid % 6000) + 1}`);
	const customerId = rows[0].uuid;

	for (let j = 0; j < count; j++) {

		const id = String((j * 6000) + (uuid + 2)).padStart(8, 0);
		//const id = String((j * 6000) + 1);

		console.log(j)

		const rows2 = await query(`select target from target where id = ${((j * 6000) % 500000) + (uuid + 2)}`);
		let url = String(rows2[0].target);
		url = url.substring(23, 33);
		console.log(url)
		console.log(customerId)
		console.log(id)

		let start = performance.now();
		const res = await query(`select * from test_table_300 where customer_id = \'${customerId}\' and target like \'%${url}%\' and id = \'${id}\'`)
		let end = performance.now();
		let cost = end - start;

		if (res.length === 1) accurency += 1;
		//console.log(j, ' cost is,',cost , 'ms');
		if (cost < minCost) minCost = cost;
		else if (cost > maxCost) maxCost = cost;
		averageCost += cost;

		console.log(accurency)
	}

	//console.log('the max Cost is ', maxCost, 'ms');
	//console.log('the min Cost is ', minCost, 'ms');
	console.log('the average Cost is ', averageCost / count, 'ms');
	//console.log('the accurency  is ', accurency / count);
	await query(`insert into test_1_res (max_cost, min_cost, average_cost, accuracy) values (${maxCost}, ${minCost}, ${averageCost / count}, ${accurency / count})`)

}

/**
 * @param {*} count 并发执行个数
 * @param {*} time  每个并发函数查询次数
 */
const test = async function test(count, time) {
	let task = []
	for (i = 0; i < count; i++) {
		task.push(selectTest(time, i))
	}
	await Promise.all(task);
}

test(20, 500);
