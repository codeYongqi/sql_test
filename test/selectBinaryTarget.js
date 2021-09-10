const BinaryTask = require("../model/binaryTarget");
const uuidUtil = require('node-uuid')

async function name() {
  let res = await BinaryTask.findAll({
    where: {
      uuid: uuidUtil.parse('1eee619d-35da-4754-e7f4-78f5c80b8d4a', Buffer.alloc(16)),
      id: '00000003'
    }
  })
  console.log(uuidUtil.unparse(uuidUtil.parse('1eee619d-35da-4754-e7f4-78f5c80b8d4a', Buffer.alloc(16))))

  res = res.map(x =>  {
    x['dataValues'].uuid = uuidParse.unparse(x['dataValues'].uuid);
    return x['dataValues'];
  });
  
  console.log(res);
}

name();