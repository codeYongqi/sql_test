const { getUUID } = require('../../../insert_taskdb/getParams');
const uuidUtil = require('node-uuid')
const BinaryTask = require('../../model/BinaryTask');

const insertBinaryTask = async function (index) {
  for (let i = index; i < index + 2000; i++) {
    console.log(i);

    let taskInfo = {};

    taskInfo.uuid = uuidUtil.parse(await getUUID(i), Buffer.alloc(16));
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

    BinaryTask.create(taskInfo);
  }
}

const runInsertBinaryTask = async function () {
  let insertPromiseArr = []
  for (let i = 0; i < 500; i++) {
    insertPromiseArr.push(insertBinaryTask(1000 * i));
  }
  await Promise.all(insertPromiseArr);
}

runInsertBinaryTask();
