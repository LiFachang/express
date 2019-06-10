var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var addArticleRouter = require('./routes/addArticle');
var getArticleRouter = require('./routes/getArticle');
var homeRouter = require('./routes/home');
var updateUserInfoRouter = require('./routes/updateUserInfo');

var app = express();



// 解决跨域
app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://140.141.163.171:81");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('lifachang')); // 配置cookie-parser中间件，xxx表示加密的随机数(相当于密钥)
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (!req.signedCookies.user_id) {
    console.log('无cookie');
    if (req.originalUrl !== '/login' &&
        req.originalUrl !== '/register' &&
        req.originalUrl !== '/home/getArticleList') {
      console.log('跳去登录页');
      res.status(401).json({code: 30001});
      return
    } else {
      console.log('正常操作');
      next()
    }
  } else {
    console.log('有cookie');
    next()
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/addArticle', addArticleRouter);
app.use('/getArticle', getArticleRouter);
app.use('/home', homeRouter);
app.use('/updateUserInfo', updateUserInfoRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
