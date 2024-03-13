
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {  
  app.use(
    createProxyMiddleware(['/request'],{        //앱서비스의 기본
        //앱서비스 포트 등록
         //target: process.env.REACT_APP_HTTP_HOST, 
        //개발 또는 로컬 시엔 로컬 호스트 
        target: "http://localhost",
        changeOrigin: true,
      })
  );
};