var express = require('express');
var router = express.Router();
var db = require('../sql');
const isOnLine = require('../isOnLine')

/* GET home page. */
//
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let password = req.body.password;
  console.log(name, password);
  let sql = `select * from user where binary name='${name}' and binary password='${password}'`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        res.cookie("user_id", results[0].id, {maxAge: 3600 * 1000, httpOnly: true, signed: true});
        res.json({code: 0, message: '登录成功'})
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    }
  });

});



module.exports = router;
