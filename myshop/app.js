var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

// 引入 body-parser
var bodyParser = require('body-parser');

//创建数据库， 加在mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //node.js 标准的 promise

//连接 MongoDb , 创建自己的db(比如：myshop)
mongoose.connect( 'mongodb://localhost/myshop') 
.then (() => console.log ('connection successful!'))
.catch ( (err) => console.log(err) );


//设置路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ProductsRouter = require('./routes/products');//商品路径


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(bodyParser()); //设置中间件 BodyParser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use(cors()); //CORS
//设置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', ProductsRouter);// 商品路由


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
