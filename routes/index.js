var express = require('express');
var router = express.Router();
var db = require('../sql');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  db.query('select * from user where userName=?',[userName], (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        res.json({code: 1, message: '注册失败，已存在该用户名'})
      } else {
        let createtime = parseInt(new Date().getTime().toString().substr(0, 10));
        // id(自增), userName, userPwd, type(0普通用户，1管理员)，status(0正常，1删除), createtime
        db.query('insert into user value (?, ?, ?, ?, ?, ?, ?)', [0, userName, userPwd, 0, 0, createtime, 0], (err, results, fields) => {
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
