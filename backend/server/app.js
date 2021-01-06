var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
const session = require('express-session');

var usersRouter = require('./src/api/users/users');
var loginRouter = require('./src/api/login/login');
var resetRouter = require('./src/api/resetPass/resetPass');
var itemsRouter = require('./src/api/items/items');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: "http://localhost", credentials: true, optionsSuccessStatus: 200 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session ({
  secret: 'maresecret',
}))

isLogged = (req, res, next) => {
  console.log("App.js: ", req.session.key)
  //console.log("ID app.js: ", req.session.id)
  if(req.session.name){
     next();
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.name);
     res.status(400).end()
  }
}

app.get('/logout', (req, res) => { console.log(req.session.name), req.session.destroy(), res.end("destroyed")})
app.use('/login', loginRouter);
app.use('/reset',resetRouter);
app.use(isLogged);
app.use('/isLogged', (req, res) => { 
  if(isLogged)
    return res.status(200).end()
})
app.use('/users', usersRouter);
app.use('/items', itemsRouter);



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

app.listen(8000)
module.exports = app;
