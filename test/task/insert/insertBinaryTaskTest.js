const { query } = require("../../../../insert_taskdb/mysql");
const { performance } = require('perf_hooks');
const BinaryTask = require("../../../model/BinaryTask");
const { getUUID } = require("../../../../insert_taskdb/getParams");
const uuidUtil = require('node-uuid');

const generateBinaryTaskInfo = async function binaryTaskInfo(i) {
    let binaryTaskInfo = {};

    binaryTaskInfo.uuid = uuidUtil.parse(await getUUID(i), Buffer.alloc(16));
    binaryTaskInfo.id = String(i + 1).padStart(8, 0)
    binaryTaskInfo.targetType = (i % 8) + 1;
    binaryTaskInfo.target = '{}';
    binaryTaskInfo.displayTarget = '{}';
    binaryTaskInfo.details = '{}';
    binaryTaskInfo.taskStatus = (i % 4) + 1;
    binaryTaskInfo.aciton = i % 20;
    binaryTaskInfo.retryCount = Math.floor(Math.random() * 10);
    binaryTaskInfo.createdTime = new Date().toLocaleString();

    let executedTime = new Date();
    executedTime.setMonth(9);
    binaryTaskInfo.executedTime = executedTime.toLocaleString();

    let finishedTime = new Date();
    finishedTime.setMonth(10);
    binaryTaskInfo.finishedTime = finishedTime.toLocaleString();

    binaryTaskInfo.errorCode = Math.floor(Math.random() * 10);
    binaryTaskInfo.taskCount = Math.floor(Math.random() * 10);
    binaryTaskInfo.accountName = 'richard_james';
    binaryTaskInfo.sourceName = Math.floor(Math.random() * 10);
    binaryTaskInfo.sourceId = String(i + 1).padStart(36, 0)
    binaryTaskInfo.description = '{}';

  return binaryTaskInfo;
}

const insertBinaryTaskTest = async function insertTest(index) {
  let maxCost = -1;
  let minCost = 3600;
  let averageCost = 0;
  let accurency = 0;
  let count = 100;

  for (let j = index; j < index + 100; j++) {
    console.log(j)

    let binaryTaskInfo = await generateBinaryTaskInfo(j);

    let start = performance.now();
    const res = await BinaryTask.create(binaryTaskInfo);
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
  await query(`insert into test_res (max_cost, min_cost, average_cost, accuracy) values (${maxCost}, ${minCost}, ${averageCost / count}, ${accurency / count})`)
}

/**
 * @param {*} count 并发执行个数
 * @param {*} time  每个并发函数查询次数
 */
const test = async function test() {
  let task = []
  for (i = 0; i < 10; i++) {
    task.push(insertBinaryTaskTest(100 * i + 2000000))
  }
  await Promise.all(task);
}

test();
