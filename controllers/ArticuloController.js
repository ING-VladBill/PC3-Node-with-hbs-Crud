var Articulo = require('../models/Articulo');

var articuloController = {};

// Mostrar lista
articuloController.list = function (req, res) {
  if (!req.session.admin) return res.redirect('/');
 Articulo.find({}).lean().exec(function (err, articulos) {
    if (err) { console.log(err); return; }
    res.render('../views/articulo/index', { articulos: articulos, titulo: 'Lista de Artículos' });
  });
};

// Mostrar uno
articuloController.show = function (req, res) {
  Articulo.findOne({ _id: req.params.id }).exec(function (err, articulo) {
    if (err) { console.log(err); return; }
    res.render('../views/articulo/show', { articulo: articulo });
  });
};

// Formulario crear
articuloController.create = function (req, res) {
  res.render('../views/articulo/create');
};

// Guardar nuevo
articuloController.save = function (req, res) {
  var articulo = new Articulo(req.body);
  articulo.save(function (err) {
    if (err) { console.log(err); return; }
    res.redirect('/articulos');
  });
};


articuloController.edit = function (req, res) {
  Articulo.findOne({ _id: req.params.id }).exec(function (err, articulo) {
    if (err) { console.log(err); return; }
    res.render('../views/articulo/edit', { articulo: articulo });
  });
};

articuloController.update = function (req, res) {
  Articulo.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        descripcion: req.body.descripcion,
        precio_soles: req.body.precio_soles,
        cantidad: req.body.cantidad,
        stock: req.body.stock,
        precio_dolares: req.body.precio_dolares,
        marca: req.body.marca,
        modelo: req.body.modelo
      }
    },
    { new: true },
    function (err) {
      if (err) { console.log(err); return; }
      res.redirect('/articulos');
    }
  );
};


articuloController.delete = function (req, res) {
  Articulo.deleteOne({ _id: req.params.id }, function (err) {
    if (err) { console.log(err); return; }
    res.redirect('/articulos');
  });
};

module.exports = articuloController;
