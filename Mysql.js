var mysql = require('mysql')

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin',
    database: 'sql_test',
    connectionLimit:10
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection( function (err, connection) {
      if(err){
        reject(err)
      }else{
        connection.query(sql, values, (err, rows) => {
          if(err){
            reject(err)
          }else{
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

// build dynamic sql statement with params
function buildSql(params, separator) {
    return new Promise (resolve => {
        let sql = '';
        let condArr = []

        if (typeof params.name !== 'undefined' ){
            condArr.push( `name = \'${params.name} \' `)
        }
        if (typeof params.phone !== 'undefined' ){
            condArr( `phone = \'${params.phone }\' `)
        }
        if (typeof params.age !== 'undefined' ){
            condArr.push(`age = \'${params.age }\' `)
        }
        if (typeof params.passwd !== 'undefined' ){
            condArr.push(`passwd = \'${params.passwd }\' `)
        }

        for (let i = 0;i < condArr.length; i++) {
            if (i == 0) sql += condArr[i];
            else sql += separator + condArr[i]
        }
        resolve(sql)
    })
}

module.exports = {pool, query, buildSql} 