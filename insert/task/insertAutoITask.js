const { getUUID } = require('../../../insert_taskdb/getParams');
const faker = require('faker');
const AutoITask = require('../../model/AutoITask');

const generateFakeData = function (type) {
  switch (type) {
    case 1:
      return faker.random.words() + faker.random.alphaNumeric();

    case 2:
      return faker.internet.email();

    case 3:
      return faker.system.fileName();

    case 4:
      return faker.system.filePath();

    case 5:
      return faker.internet.ip();

    case 6:
      return faker.internet.domainName();

    case 7:
      return faker.internet.url();

    case 8:
      return faker.internet.userName();
  }
}

const insertBinaryTask = async function (index) {
  for (let i = index; i < index + 1000; i++) {
    console.log(i);

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

    AutoITask.create(taskInfo);
  }
}

const runInsertBinaryTask = async function () {
  let insertPromiseArr = []
  for (let i = 0; i < 100; i++) {
    insertPromiseArr.push(insertBinaryTask(1000 * i));
  }
  await Promise.all(insertPromiseArr);
}

runInsertBinaryTask();
