const { query } = require("../../insert_taskdb/mysql");
const { performance } = require('perf_hooks');


function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

function insertUUID(){
    var start = performance.now();

    for(i = 0;i < 6000; i++) {
        console.log(i);
        var uuid = generateUUID();
        console.log(uuid)
        query(`insert into customer_uuid (uuid) values (\'${uuid}\') `);
    }

    var end = performance.now();
    console.log('insert 6000 rows cost is,',end - start, ' ms');
}

insertUUID();
//insert 6000 rows cost is, 4285.665200009942  ms