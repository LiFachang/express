var express = require('express');
var router = express.Router();
var db = require('../sql');

/* GET home page. */
//
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/test', (req, res ,next)=> {
  console.log('***********************');
  console.log(req.signedCookies.token);
  console.log(req.body.data);
  console.log('***********************');
  res.json({code: 0, token: req.signedCookies.token || 'cookie已失效', data: req.body.data});
});

router.post('/', function(req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;

  let sql = `select * from user where binary userName='${userName}' and binary userPwd='${userPwd}'`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      console.log('查询结果：', results);
      if (results.length > 0) {
        res.cookie("token",'ABCDEFG',{maxAge: 1800000, httpOnly: true, signed: true});
        res.json({code: 0, message: '登录成功'})
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    }
  });

});



module.exports = router;
