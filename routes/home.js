var express = require('express');
var router = express.Router();
var db = require('../sql');

router.get('/getArticleList', (req, res, next) => {
  let sql = `select user.id, user.name, user.head_photo, article.id, article.type, article.title, article.content, article.read, article.comment, article.fabulous, article.createtime from user inner join article on user.id=article.author`;
  db.query({sql, nestTables:'_'}, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json({code: 0, data: result})
    }
  });
});


module.exports = router;
