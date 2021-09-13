const { query } = require("../../../../insert_taskdb/mysql");
const { performance } = require('perf_hooks');
const AutoITask = require("../../../model/AutoITask");

const generateAutoITaskInfo = async function autoITaskInfo(i) {
    let autoITaskInfo = {};

    autoITaskInfo.customerId = await getUUID(i);
    autoITaskInfo.id = String(i + 1).padStart(8, 0)
    autoITaskInfo.targetType = (i % 8) + 1;
    autoITaskInfo.target = '{}';
    autoITaskInfo.displayTarget = '{}';
    autoITaskInfo.details = '{}';
    autoITaskInfo.taskStatus = (i % 4) + 1;
    autoITaskInfo.aciton = i % 20;
    autoITaskInfo.retryCount = Math.floor(Math.random() * 10);
    autoITaskInfo.createdTime = new Date().toLocaleString();

    let executedTime = new Date();
    executedTime.setMonth(9);
    autoITaskInfo.executedTime = executedTime.toLocaleString();

    let finishedTime = new Date();
    finishedTime.setMonth(10);
    autoITaskInfo.finishedTime = finishedTime.toLocaleString();

    autoITaskInfo.errorCode = Math.floor(Math.random() * 10);
    autoITaskInfo.taskCount = Math.floor(Math.random() * 10);
    autoITaskInfo.accountName = 'richard_james';
    autoITaskInfo.sourceName = Math.floor(Math.random() * 10);
    autoITaskInfo.sourceId = String(i + 1).padStart(36, 0)
    autoITaskInfo.description = '{}';

  return autoITaskInfo;
}

const insertAutoITaskTest = async function insertTest(index) {
  let maxCost = -1;
  let minCost = 3600;
  let averageCost = 0;
  let accurency = 0;
  //循环次数
  let count = time

  for (let j = index; j < index + 1000; j++) {
    console.log(j)

    let autoITaskInfo = generateAutoITaskInfo();

    let start = performance.now();
    const res = await AutoITask.create(autoITaskInfo);
    let end = performance.now();
    let cost = end - start;
    console.log(res);

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
  await query(`insert into test_1_res (max_cost, min_cost, average_cost, accuracy) values (${maxCost}, ${minCost}, ${averageCost / count}, ${accurency / count})`)
}

/**
 * @param {*} count 并发执行个数
 * @param {*} time  每个并发函数查询次数
 */
const test = async function test() {
  let task = []
  for (i = 0; i < 100; i++) {
    task.push(insertAutoITaskTest(100 * i))
  }
  await Promise.all(task);
}

test();
