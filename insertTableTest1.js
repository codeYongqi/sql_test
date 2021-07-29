const { query } = require("./Mysql");
const { performance } = require('perf_hooks');

async function insertInfo() {

    var start = performance.now();
    for(j = 0; j < 3000000; j++) {
        console.log(j)
        targetType = Math.floor( Math.random()*10 );
        id = String(j+1).padStart(8, 0);

        date = new Date().toLocaleString();
        date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
        console.log(date)

        const rr = await query(`select target from target where id = ${(j % 500000) + 1 }`);
        const target = rr[0].target;  

        const rows = await query(`select uuid from customer_uuid where id = ${(j % 6000) + 1}`);
        customerId = rows[0].uuid;  
        await query(`insert into test_table_300 (customer_id, id, target_type, target, created_time) values (\'${customerId}\', \'${id}\', ${targetType}, \'${target}\',\'${date}\')`);
    }
    var end = performance.now();
    console.log('cost is,',(end - start) / 1000, ' s');
}

insertInfo()

