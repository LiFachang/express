var express = require('express');
var router = express.Router();
var db = require('../sql');



router.post('/', function(req, res, next) {
  let type = req.body.type;
  if (type === 1) {
    let title = req.body.title.trim();
    let userID = req.signedCookies.userID;
    // 检查文章标题重名
    let sql = `select * from article where binary title='${title}' and author='${userID}'`;
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      } else {
        if (results.length > 0) {
          res.json({code: 1, message: '发布失败，您已发布过同名文章'});
        } else {
          let content = req.body.content.trim();
          let sql = `INSERT INTO article(author, type, title, content) VALUES('${userID}', '${type}', '${title}', '${content}')`;
          db.query(sql, (err, result, fields) => {
            if (err) {
              throw err;
            } else {
              console.log(result);
              res.json({code: 0, message: '发布成功'});
            }
          });
        }
      }
    });
  }
});



module.exports = router;
