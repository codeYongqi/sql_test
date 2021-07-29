const { query } = require("./Mysql");
const { performance } = require('perf_hooks');

async function insertInfo() {
    //console.log(targetType)

    var start = performance.now();
    for(j = 0; j < 3000000; j++) {
        console.log(j)
        targetType = Math.floor( Math.random()*10 );
        id = String(j+1).padStart(8, 0);
        // console.log(id);

        date = new Date().toLocaleString();
        date = require('moment')().format('YYYY-MM-DD HH:mm:ss');
        console.log(date)
        // console.log(url);

        const rr = await query(`select target from target where id = ${(j % 500000) + 1 }`);
        const target = rr[0].target;  

        const rows = await query(`select uuid from customer_uuid where id = ${(j % 6000) + 1}`);
        customerId = rows[0].uuid;  
        //console.log(customerId);
        await query(`insert into test_table_300 (customer_id, id, target_type, target, created_time) values (\'${customerId}\', \'${id}\', ${targetType}, \'${target}\',\'${date}\')`);
    }
        var end = performance.now();
        console.log('cost is,',(end - start) / 1000, ' s');
}

insertInfo()

