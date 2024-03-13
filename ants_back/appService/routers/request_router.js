const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const { pool} = require('../dbConfig_maria');

app.use(express.json());

function getActualQuery(queryString, values) {
    let i = 0;
    return queryString.replace(/\$(\d+)/g, () => {
        return `'${values[i++]}'`;  // 각 값에 따옴표를 추가합니다.
    });
  }

  function requestGetSample(req, res, next) {
    const queryString= `SELECT 1 WHERE 1 = $1`;
    // const values=[req.query.param1];

    pool.query(queryString, values, (error, results) => {
       if (error) {
         console.error('get 실패 : ', error.stack);
         
       } else {
         console.log('get 성공 : ' + results);
         const actualQuery = getActualQuery(queryString, values);
         console.log(actualQuery);
         res.send(results);
       }
     });
    }
  

 function requestPostSample(req, res) {
    pool.query('SELECT 1', [], function (error, results, fields) {
        if (error) {
            console.log('post 에러 : ' + error);
            res.status(500).send('An error occurred');
            return;
        }
        console.log('post 성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        res.send(results);
    });
}

router.get("/getTest", requestGetSample);
router.post("/postTest", requestPostSample);

// 여기서 router 객체를 내보내면 app.use에서 사용할 수 있습니다.
module.exports = router;

