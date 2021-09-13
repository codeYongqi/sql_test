const { query } = require("../../../../insert_taskdb/mysql");
const { performance } = require('perf_hooks');
const { findByCustomerIdAndId } = require("../../../mapper/TaskMapper");

const testTask = async function selectTest(time, uuid) {
  let maxCost = -1;
  let minCost = 3600;
  let averageCost = 0;
  let accurency = 0;
  //循环次数
  let count = time

  const customerId = '000042be-987b-4b06-93a9-722764676bc4';

  for (let j = 0; j < count; j++) {

    const id = '00054216'

    console.log(j)

    let start = performance.now();
    const res = await findByCustomerIdAndId(customerId, [id]);
    let end = performance.now();
    let cost = end - start;
    console.log(res);

    if (res.length === 1) accurency += 1;
    //console.log(j, ' cost is,',cost , 'ms');
    if (cost < minCost) minCost = cost;
    else if (cost > maxCost) maxCost = cost;
    averageCost += cost;

    // console.log(accurency)
  }

  //console.log('the max Cost is ', maxCost, 'ms');
  //console.log('the min Cost is ', minCost, 'ms');
  console.log('the average Cost is ', averageCost / count, 'ms');
  //console.log('the accurency  is ', accurency / count);
  await query(`insert into test_res (max_cost, min_cost, average_cost, accuracy) values (${maxCost}, ${minCost}, ${averageCost / count}, ${accurency / count})`)

}

/**
 * @param {*} count 并发执行个数
 * @param {*} time  每个并发函数查询次数
 */
const test = async function test(count, time) {
  let task = []
  for (i = 0; i < count; i++) {
    task.push(testTask(time, i))
  }
  await Promise.all(task);
}

test(30, 1000);