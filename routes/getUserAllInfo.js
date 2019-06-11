var express = require('express');
var router = express.Router();
var db = require('../sql');



router.post('/', function(req, res, next) {
  let user_id = req.signedCookies.user_id;
  let sql = `select user.name,
                    user.sex,
                    user.age,
                    user.tel,
                    user.email,
                    user.head_photo from user where id='${user_id}'`;
  db.query({sql, nestTables:'_'}, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({code: 0, data: result})
    }
  });
});



module.exports = router;
