'use strict';
const mongoose = require('mongoose');

//definimos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String, 
    tags: [String]
})
// agenteSchema.createIndex()

//creamos el modelo, busca usuarios*
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

//exportamos el modelo (opcional)
module.exports = Anuncio;