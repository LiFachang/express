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
        console.log(results);
        let data = {
          name: results[0].name,
          sex: results[0].sex,
          age: results[0].age,
          tel: results[0].tel,
          email: results[0].email,
          head_photo: 'http://140.143.163.171:8888/' + results[0].head_photo
        }
        res.cookie("user_id", results[0].id, {maxAge: 3600 * 1000, httpOnly: true, signed: true});
        res.json({code: 0, message: '登录成功', data})
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    }
  });

});



module.exports = router;
