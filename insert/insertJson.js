const { query } = require('../mysql');
const faker = require('faker');

const geneTargetData = function generateTargetDataByFaker() {
  let target = {};
  target.filePath = faker.system.filePath();
  target.hostname = faker.internet.userName();
  target.ip = faker.internet.ip();
  target.domain = faker.internet.domainName();
  target.url = faker.internet.url();
  target.filename = faker.system.fileName();
  target.mailbox = faker.internet.email();
  target.messageSubject = faker.random.word();
  target.messageId = String(faker.datatype.number());
  return target;
}

const insertJson = async function (index) {
  for (let i = index; i < index + 1000; i++) {
    console.log(i);
    let id = String(i+1).padStart(8, 0);
    let targetData = geneTargetData(); 
    let targetDataJson = JSON.stringify(targetData); 

    console.log(targetDataJson);
    await query(`insert into json_test_50w (id, target) values (\'${id}\', \'${targetDataJson}\')`);
  }
}

const runInsert = async function() {
  let insertPromiseArr = [];
  for (let i = 0; i < 500; i++) {
    insertPromiseArr.push(insertJson(i * 1000));
  }
  await Promise.all(insertPromiseArr);
}

runInsert();
