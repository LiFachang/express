var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
var router = express.Router();
var db = require('../sql');


router.post('/', function(req, res, next) {
  let dataType = req.body.dataType || false;
  if (!dataType) {
    // 头像
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../public/blog/images/avatar'); // ------图片上传目录
    // 删除旧头像
    let avatarList = [
      `${req.signedCookies.user_id}.jpeg`,
      `${req.signedCookies.user_id}.jpg`,
      `${req.signedCookies.user_id}.png`
    ];
    avatarList.forEach((item, index) => {
      let src = path.join(__dirname, `/../public/blog/images/avatar/${item}`)
      if (fs.existsSync(src)) {
        fs.unlinkSync(src)
      } else {
        console.log(`${item}不存在`);
      }
    });
    form.parse(req, (err, fields, files) => {
      let oldPath = files.file.path;
      let type = files.file.type.split('/')[1];
      let newPath = path.normalize(__dirname + '/../public/blog/images/avatar/'+ req.signedCookies.user_id +'.' + type);  // -------给上传的图片重命名
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          res.json({code: 1, message: '上传失败'});
          return
        }
        if (newPath) {
          let avatarPath = 'images/avatar/'+ req.signedCookies.user_id +'.' + type; // ------ 存入数据库的图片地址(相对于页面)
          let sql = `update user set head_photo='${avatarPath}' where id='${req.signedCookies.user_id}'`;
          db.query(sql, (err, result, fields) => {
            if (err) {
              throw err
            } else {
              // console.log(result)
              res.json({code: 0, message: 'ok', data: avatarPath});
            }
          })

        }
      })
    })
  } else {
    // 文字信息
    console.log('=================');
    console.log(req.body);
    let obj = req.body;
    delete obj.dataType;
    let sql = 'update user set '
    for (let key in obj) {
      if (key === 'sex' || key === 'age') {
        sql += `${key}=${obj[key]},`
      } else {
        sql += `${key}='${obj[key]}',`
      }
    }
    sql = sql.substring(0, sql.length - 1);
    sql += ` WHERE id=${req.signedCookies.user_id}`;
    db.query(sql, (err, result, fields) => {
      if (err) {
        console.log(err)
        res.json({code: 1, message: '更新失败'})
      } else {
        res.json({code: 0, message: '更新成功'})
      }
    })
    console.log(sql);
    console.log('=================');
  }
});



module.exports = router;
