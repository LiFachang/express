var express = require('express');
var router = express.Router();
var db = require('../sql');

/* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
  let name = req.body.userName;
  let password = req.body.userPwd;
  let sql = `select * from user where binary name='${name}'`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        res.json({code: 1, message: '注册失败，已存在该用户名'})
      } else {
        let createtime = new Date().getTime().toString().substr(0, 10);
        let sql = `insert into user (name, password, createtime) VALUES ('${name}', '${password}', '${createtime}')`;
        db.query(sql, (err, results, fields) => {
          if (err) {
            throw err;
          } else {
            res.json({code: 0, message: '注册成功，去登陆'});
          }
        });
      }
    }
  });

});



module.exports = router;
