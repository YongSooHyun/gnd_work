const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const uploader = require('../fileUpload');
//const { pool} = require('../dbConfig_maria');
app.use(express.json());

function getActualQuery(queryString, values) {
    let i = 0;
    return queryString.replace(/\$(\d+)/g, () => {
        return `'${values[i++]}'`;  // 각 값에 따옴표를 추가합니다.
    });
  }

  function queryAsync(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
  }
  // 사진 업로드
  async function handlePhotoUpload(req, res, next) {
    let ResponseData = {};
    FileControl.FileAppend('handlePhotoUpload start (사진 업로드 요청) : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
    FileControl.FileAppend('요청 사용자 ID : ' + req.body.userId);
    const formData = req.body;
    console.log("FORM DATA:"+JSON.stringify(formData));
    
    FileControl.FileAppend('파일내용 : ' + JSON.stringify(req.file));
      console.log('filename:'+req.file.filename);
      ResponseData.filename = req.file.filename;
      ResponseData.UserId = req.body.userId;
      ResponseData.originalname = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
      ResponseData.Size = req.file.size;
      ResponseData.path = req.file.path;
      ResponseData.mimetype = req.file.mimetype;
      FileControl.FileAppend(req.body.TextInput);
      
      pool.query(Query.handleInsertPhoto, [req.body.userId, req.file.path, Buffer.from(req.file.originalname, 'latin1').toString('utf8'), req.file.filename, req.file.mimetype, req.body.TextInput], function (error, results, fields) {
        if (error) {
          FileControl.FileAppend('handlePhotoUpload 쿼리에러 :' + error);
        }
  
        FileControl.FileAppend('handlePhotoUpload 쿼리성공 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        FileControl.FileAppend('응답완료 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
        FileControl.FileAppend(JSON.stringify(ResponseData));
        res.send(ResponseData);
      });
    }
  
    async function ProductRegistration(req, res, next) {
      const formData = req.body;
      console.log("FORM DATA:"+JSON.stringify(formData));
      FileControl.FileAppend('상품등록요청: ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
  
      try {
  
          const productResult = await queryAsync(`INSERT INTO luxkiz.product_info(
            product_name,
            product_price,
            product_title,
            product_color,
            product_type,
            product_img)
            VALUES ($1 , $2 , $3 , $4 , $5 ,$6)
            RETURNING product_id`,
             [formData.model,
              formData.price,
              formData.title,
              formData.optionValue,
              formData.Radio
            ,Buffer.from(req.files[0].filename,'latin1').toString('utf8')]);
              console.log("시퀀스데이터 :"+ JSON.stringify(productResult.rows[0]));
          const productId = productResult.rows[0].product_id; // 상품 id 가져오기!
          console.log("상품ID = " + productId);
  
          for (let file of req.files) {
  
              FileControl.FileAppend('파일내용 : ' + JSON.stringify(file));
  
              await queryAsync(`INSERT INTO luxkiz.product_img(
                  product_id ,
                  product_img ,
                  create_date ,
                  modify_date )
                  VALUES ($1 , $2 , NOW(), NOW())`,
                 [productId /* newly inserted id */,
                  Buffer.from(file.filename,'latin1').toString('utf8')]
              );
         }
         res.send(productId);
       } catch (error) {
  
           FileControl.FileAppend('ProductRegistration 쿼리에러 :' + error);
  
       }
  }
  
  router.post("/Image", uploader.upload.single('img'), handlePhotoUpload); // 사진 업로드
router.post("/ProductRegistration", uploader.upload.array('imgs'), ProductRegistration); // 사진 업로드

// 여기서 router 객체를 내보내면 app.use에서 사용할 수 있습니다.
module.exports = router;

