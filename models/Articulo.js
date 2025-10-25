const { type } = require('express/lib/response');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticuloSchema = new Schema({
  descripcion: { type: String, required: true },
  precio_soles: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  stock: { type: Number, required: true },
  precio_dolares: { type: Number, required: true },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  id: { type: Number, required: true}
});

module.exports = mongoose.model('Articulo', ArticuloSchema);
