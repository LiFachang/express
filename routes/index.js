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
      console.log(results);
      if (results.length > 0) {
        res.json({code: 1, message: '已存在用户名'})
      } else {
        db.query('insert into user value (?, ?, ?)', [0, userName, userPwd], (err, results, fields) => {
          if (err) {
            throw err;
          } else {
            res.json({code: 0, message: '注册成功！'});
          }
        });
      }
    }
  });

});



module.exports = router;
