var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

// Rutas
var loginRouter = require('./routes/login');
var articulosRouter = require('./routes/articulos');

var app = express();

// 🔹 Conexión a MongoDB
var mongoDB = 'mongodb://127.0.0.1:27017/pc3';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Conectado correctamente a MongoDB: pc3');
});

// 🔹 Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 🔹 Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Configuración de sesión (antes de las rutas)
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));

// 🔹 Rutas
app.use('/', loginRouter);
app.use('/articulos', articulosRouter);

// 🔹 Manejador de error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// 🔹 Manejador de errores generales
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
