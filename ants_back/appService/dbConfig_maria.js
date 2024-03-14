const mysql = require('mysql');

var ConnectionString = {
  host: 'gndkr.com',
  user: 'gndkr',
  password: 'shinha2091!',
  database: 'gndkr'
};

var connection = mysql.createConnection(ConnectionString);
var pool = mysql.createPool(ConnectionString);

connection.connect();

function execute(query, param) {
  return new Promise((resolve, reject) =>
    pool.query(query, param, (error, results, fields) => {
      if (error) {
        reject(error);
      }

      // 결과 배열을 순회하며 각 컬럼 확인
      const processedResults = results.map(row => {
        const processedRow = {};
        for (let column in row) {
          if (row.hasOwnProperty(column)) {
            // 컬럼 값이 Buffer 객체인 경우, 문자열로 변환
            processedRow[column] = Buffer.isBuffer(row[column]) ? row[column].toString('utf-8') : row[column];
          }
        }
        return processedRow;
      });

      resolve(processedResults);
    })
  );
}

// 데이터베이스 연결 유지
setInterval(function () {
  connection.query('SELECT 1');
}, 60000);

module.exports = { connection, pool, execute };