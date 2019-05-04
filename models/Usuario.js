'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true},
    password: String
})
// agenteSchema.createIndex()

//creamos el modelo, busca usuarios*
const Usuario = mongoose.model('Usuario', usuarioSchema);

//exportamos el modelo (opcional)
module.exports = Usuario;