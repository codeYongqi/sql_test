const Target = require('../model/target');
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

const insert = async function() {
  let targetData = geneTargetData();
  let insertData = {
    id: '10320005',
    target: {}
  }
  await Target.create(insertData);
}

insert();