const { query } = require("../../../../insert_taskdb/mysql");
const { performance } = require('perf_hooks');
const Task = require("../../../model/Task");

const generateTaskInfo = async function taskInfo(i) {
    let taskInfo = {};

    taskInfo.customerId = await getUUID(i);
    taskInfo.id = String(i + 1).padStart(8, 0)
    taskInfo.targetType = (i % 8) + 1;
    taskInfo.target = '{}';
    taskInfo.displayTarget = '{}';
    taskInfo.details = '{}';
    taskInfo.taskStatus = (i % 4) + 1;
    taskInfo.aciton = i % 20;
    taskInfo.retryCount = Math.floor(Math.random() * 10);
    taskInfo.createdTime = new Date().toLocaleString();

    let executedTime = new Date();
    executedTime.setMonth(9);
    taskInfo.executedTime = executedTime.toLocaleString();

    let finishedTime = new Date();
    finishedTime.setMonth(10);
    taskInfo.finishedTime = finishedTime.toLocaleString();

    taskInfo.errorCode = Math.floor(Math.random() * 10);
    taskInfo.taskCount = Math.floor(Math.random() * 10);
    taskInfo.accountName = 'richard_james';
    taskInfo.sourceName = Math.floor(Math.random() * 10);
    taskInfo.sourceId = String(i + 1).padStart(36, 0)
    taskInfo.description = '{}';

  return taskInfo;
}

const insertTaskTest = async function insertTest(index) {
  let maxCost = -1;
  let minCost = 3600;
  let averageCost = 0;
  let accurency = 0;
  //循环次数
  let count = time

  for (let j = index; j < index + 1000; j++) {
    console.log(j)

    let taskInfo = generateTaskInfo();

    let start = performance.now();
    const res = await Task.create(taskInfo);
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
    task.push(insertTaskTest(100 * i))
  }
  await Promise.all(task);
}

test();
