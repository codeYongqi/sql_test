const BinaryTask = require("../model/binaryTarget");
const uuidParse = require('uuid-parse');

async function name() {
  let res = await BinaryTask.findAll({
    where: {
      id: '00000003'
    }
  })

  res = res.map(x =>  {
    x['dataValues'].customerId = uuidParse.unparse(x['dataValues'].customerId);
    return x['dataValues'];
  });
  
  console.log(res);
}

name();