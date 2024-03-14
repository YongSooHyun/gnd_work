const mysql = require('mysql');

var ConnectionString = {
  host: 'gndkr.com',
  user: 'gndkr',
  password: 'shinha2091',
  database: 'gndkr'
}
var connection = mysql.createConnection(ConnectionString);

var pool = mysql.createPool(ConnectionString);
connection.connect();

function execute(query, param) {
  return new Promise((resolve, reject) =>
    pool.query(query, param, (error, result, fields) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  );
}
setInterval(function () {
  connection.query('select 1');
}, 60000);
module.exports = { connection, pool, execute };