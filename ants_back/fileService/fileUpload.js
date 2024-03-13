const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageDir = path.resolve(__dirname + '/images');


console.log('FILE UPLOAD __DIRNAME : [' + __dirname + ']');
console.log(imageDir);

if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            try {
                cb(null, imageDir);
                console.log('파일전송 : ' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            } catch (error) {
                console.log('파일전송 실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
                cb(error);
            }
        },
        filename: function (req, file, cb) {
            try {
                console.log(file);
                console.log(req.body);
                var ext = file.mimetype.split('/')[1];

                if (!['png', 'jpg', 'jpeg', 'gif', 'avi', 'mkv', 'mp4'].includes(ext)) {
                    return cb(new Error('Only images and certain video formats are allowed'));
                }
                var originalNameWithoutExt = path.basename(file.originalname, path.extname(file.originalname));
                // 파일명에 원래 파일의 이름과 타임스탬프를 포함시킵니다.
                var filename = 'S_PHOTO_' + originalNameWithoutExt + '_' + Date.now() + '.' + ext;
                cb(null, filename);

                console.log('파일전송콜백' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
            } catch (error) {
                console.log('파일전송실패' + new Date().toFormat('YYYY-MM-DD HH24:MI:SS'));
                cb(error);
            }
        }
    })
});


module.exports = { upload };
