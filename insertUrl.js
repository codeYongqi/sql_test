const { query } = require("./Mysql");
const { performance } = require('perf_hooks');

function randomString(e) {    
    e = e || 32;
    let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function buildURL() {
    let lenA = Math.floor( Math.random() * 100 );
    let lenB = Math.floor( Math.random() * 100 );
    let lenC = Math.floor( Math.random() * 100 );
    return 'https://trendmicro.com/' + randomString(lenA) + '/'
    + randomString(lenB) +'/'+ randomString(lenC)
}

async function insertUrl() {

    var start = performance.now();
    for(j = 0; j < 500000; j++) {
        console.log(j)
        url = buildURL();
        await query(`insert into target(target) values ( \'${url}\')`);
    }
        var end = performance.now();
        console.log('cost is,',(end - start) / 1000, ' s');
}

insertUrl();

