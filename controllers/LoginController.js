var Administrador = require('../models/Administrador');

var loginController = {};

loginController.loginForm = function (req, res) {
  res.render('../views/login/login');
};

loginController.login = function (req, res) {
  const { usuario, clave } = req.body;

  Administrador.findOne({ usuario: usuario, clave: clave }).exec(function (err, admin) {
    if (err) { console.log(err); return res.render('../views/login/login', { error: 'Error interno' }); }

    if (!admin) {
      res.render('../views/login/login', { error: 'Usuario o clave incorrectos' });
    } else {
      req.session.admin = admin;
      res.redirect('/articulos');
    }
  });
};

loginController.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};


module.exports = loginController;
