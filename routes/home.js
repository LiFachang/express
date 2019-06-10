var express = require('express');
var router = express.Router();
var db = require('../sql');

router.post('/getArticleList', (req, res, next) => {
  let sql = `select user.id, user.name, user.head_photo, article.id, article.type, article.title, article.content, article.read, article.comment, article.fabulous, article.createtime from user inner join article on user.id=article.author`;
  db.query({sql, nestTables:'_'}, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({code: 0, data: result})
    }
  });
});



router.post('/', function(req, res, next) {
  let type = req.body.type;
  if (type === 1) {
    let title = req.body.title.trim();
    let user_id = req.signedCookies.user_id;
    // 检查文章标题重名
    let sql = `select * from article where binary title='${title}' and author='${user_id}'`;
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      } else {
        if (results.length > 0) {
          res.json({code: 1, message: '发布失败，您已发布过同名文章'});
        } else {
          let content = req.body.content.trim();
          let sql = `INSERT INTO article(author, type, title, content) VALUES('${user_id}', '${type}', '${title}', '${content}')`;
          db.query(sql, (err, result, fields) => {
            if (err) {
              throw err;
            } else {
              console.log(result);
              res.json({code: 0, message: '发布成功', articleId: result.insertId});
            }
          });
        }
      }
    });
  }
});



module.exports = router;
