var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdministradorSchema = new Schema({
  usuario: { type: String, required: true },
  clave: { type: String, required: true },
  correo: { type: String, required: true }
});

module.exports = mongoose.model('Administrador', AdministradorSchema, 'administradores');
