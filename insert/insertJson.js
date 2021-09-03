const { query } = require('../mysql');
const faker = require('faker');
const { performance } = require('perf_hooks');

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

const insert = async function () {
      let FakeData = geneTargetData();
      let insertData = JSON.stringify(FakeData);

    	let start = performance.now();
		  await query(`insert into json_test_50w (id, target) values (\'50001011\', \'${insertData}\')`);
    	let end = performance.now();
		  let cost = end - start;
      console.log(cost);

    	start = performance.now();
		  await query(`insert into json_test_50w (id, target) values (\'50001012\', \'${insertData}\')`);
    	end = performance.now();
		  cost = end - start;
      console.log(cost);
}
insert();

const insertJson = async function (index) {
  for (let i = index; i < index + 10; i++) {
    console.log(i);
    let id = String(i+1).padStart(8, 0);
    let targetData = geneTargetData(); 
    let targetDataJson = JSON.stringify(targetData); 

    console.log(targetDataJson);
    console.log(targetData);
    // await query(`insert into json_test_50w (id, target) values (\'${id}\', \'${targetData}\')`);
  }
}

const runInsert = async function() {
  let insertPromiseArr = [];
  for (let i = 0; i < 1; i++) {
    insertPromiseArr.push(insertJson(i + 1000000));
  }
  await Promise.all(insertPromiseArr);
}

// runInsert();
