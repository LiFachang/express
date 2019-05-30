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
  console.log(req.signedCookies.userID);
  console.log('***********************');
  res.json({code: 0, token: req.signedCookies.userID || 'cookie已失效', data: req.body.data});
});

router.post('/', function(req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;

  let sql = `select * from user where binary userName='${userName}' and binary userPwd='${userPwd}'`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        res.cookie("userID", results[0].id, {maxAge: 3600 * 1000, httpOnly: true, signed: true, domain: '127.0.0.1'});
        res.json({code: 0, message: '登录成功'})
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    }
  });

});



module.exports = router;
