var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var carritoRouter = require('./routes/productCart');
var registerRouter = require('./routes/register');
var producAddRouter = require('./routes/productAdd');
var producDetailRouter = require('./routes/productDetail');
var productsRouter = require('./routes/products')
var loginRouter = require('./routes/login');
var errorRouter = require('./routes/error')
var logMiddlewares = require('./middlewares/logMiddlewares');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logMiddlewares)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/carrito', carritoRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter)
app.use('/products', productsRouter)
app.use('/productadd', producAddRouter);
app.use('/productdetail', producDetailRouter);

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
