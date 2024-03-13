const express = require('express');
const https = require('https');
const path = require('path');

const cors = require('cors');
const fs = require('fs');
const request = require('./routers/upload_router');
require('date-utils');


//서버 설정 
const HTTPS_PORT = 3000;

//인증서
const options = {
    key: fs.readFileSync(path.resolve(__dirname, './crt/skynet.re.kr.key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './crt/skynet.re.kr.crt.pem'))
};

const app = express(); // Default route for server status 
//접근 CORS보안설정


var whitelist = [
    'http://localhost',
    ]
    var corsOptions = {
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                FileControl.FileAppend('정상 요청 : ' + origin);
                callback(null, true)
            } else if (origin === undefined) {
                FileControl.FileAppend('알수없는 출처 요청');
            } else {
                FileControl.FileAppend('origin 주소 : ' + origin);
                FileControl.FileAppend('허용하지 않은 접근' + origin);
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    }



//API 등록 시작
app.use(express.static('static'));
app.use(express.static('src'));
//body-parser 기능을 해줌
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//스테틱 폴더 경로설정
app.use('/upload', request);
app.use(cors(corsOptions));
app.use(express.static(path.resolve(__dirname, "../build")));
console.log(path.resolve(__dirname + '/../static'));
app.use('/app', express.static(path.resolve(__dirname + '/../static')));
console.log('HTTPS-서버시작');

//HTTP 접근 설정
app.get("/", (req, res) => {
    fs.readFile(path.resolve(__dirname, "../build/index.html"), (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send("<h1>500 Error</h1>");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

https.createServer(options,app).listen(HTTPS_PORT,()=>{
     console.log('HTTPS =>File.Skynet : '+HTTPS_PORT);
}); // Create an HTTPS server. 