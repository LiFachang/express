var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
var router = express.Router();
var db = require('../sql');
let host = 'http://140.143.163.171/'


router.post('/', function(req, res, next) {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.normalize(__dirname + '/../public/images/avatar'); // ------图片上传目录
  form.parse(req, (err, fields, files) => {
    let oldPath = files.file.path;
    console.log(files.file);
    let type = files.file.type.split('/')[1];
    let newPath = path.normalize(__dirname + '/../public/images/avatar/'+ req.signedCookies.user_id +'.' + type);  // -------给上传的图片重命名
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.json({code: 1, message: '上传失败'});
        return
      }
      if (newPath) {
        let avatarPath = 'public/images/avatar/'+ req.signedCookies.user_id +'.' + type; // ------ 存入数据库的图片地址(相对于页面)
        let sql = `update user set head_photo='${avatarPath}' where id='${req.signedCookies.user_id}'`;
        db.query(sql, (err, result, fields) => {
          if (err) {
            throw err
          } else {
            console.log(result)
            res.json({code: 0, message: 'ok'});
          }
        })

      }
    })
  })
});



module.exports = router;
