var express = require('express');
var router = express.Router();
var db = require('../sql');

/* GET home page. */
//
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  console.log(userName, userPwd);
  db.query('select * from user where userName=? and userPwd=?',[userName, userPwd], (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      console.log('查询结果：', results);
      if (results.length > 0) {
        res.json({code: 0, message: '登录成功', token: '1234'})
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    }
  });

});



module.exports = router;
