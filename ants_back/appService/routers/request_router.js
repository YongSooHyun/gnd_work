const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const { pool } = require('../dbConfig_maria');

app.use(express.json());

function execute(query, param) {
  return new Promise((resolve, reject) => {
    pool.query(query, param, (error, results, fields) => {
      if (error) {
        reject(error);
      }

      // 결과 배열을 순회하며 각 컬럼 확인 및 바이트 컬럼을 문자열로 변환
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
    });
  });
}

router.get("/getTest", (req, res) => {
  execute('SELECT title, document_srl FROM xe_documents', [])
    .then(results => {
      console.log('get 성공 : ', new Date().toISOString());
      res.send(results);
    })
    .catch(error => {
      console.log('get 에러 : ', error);
      res.status(500).send('An error occurred');
    });
});

router.post("/postTest", (req, res) => {
  execute('SELECT 1', [])
    .then(results => {
      console.log('post 성공 : ', new Date().toISOString());
      res.send(results);
    })
    .catch(error => {
      console.log('post 에러 : ', error);
      res.status(500).send('An error occurred');
    });
});

module.exports = router;