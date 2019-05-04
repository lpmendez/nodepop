//script para inicializar la base y cargar anuncios pre poblados
const connection = require('./connection');
const Anuncio = require('../models/Anuncio');

const dropTables = async ()=>{
    try{
        await connection.dropCollection('anuncios');
        console.log('Borrado');
    }
    catch(err){
        console.log('Error al borrar tabla', err);
    }
}

const saveAnuncio = async (data)=>{

    const anuncio = new Anuncio(data);
    await anuncio.save();
    console.log('Guardado', anuncio);
}
const saveAnuncios = async (data)=>{

    try{
        await Anuncio.insertMany(data);
        console.log('Guardados', data);
    }
    catch(err){
        console.log('Error', err)
    }
}
const saveAnunciosCallback = (data)=>{

    Anuncio.insertMany(data, (err, doc)=>{
        if(err){
            console.log('Error', err);
            return;
        }
        console.log('Guardados', doc)
    });
    
}

//borrando tablas
dropTables();

// let anuncio = new Anuncio({
//     "nombre": "Bicicleta",
//     "venta": true,
//     "precio": 230.15,
//     "foto": "images/anuncios/bici.jpg",
//     "tags": [ "lifestyle", "motor"]
// })
// saveAnuncio(anuncio).catch(err=>{
//     console.log('Error', err, anuncio);
// });

// anuncio = new Anuncio({
//     "nombre": "iPhone 3GS",
//     "venta": false,
//     "precio": 50.00,
//     "foto": "images/anuncios/iphone.png",
//     "tags": [ "lifestyle", "mobile"]
// })
// saveAnuncio(anuncio).catch(err=>{
//     console.log('Error', err, anuncio);
// });

let anuncios = [
    {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "images/anuncios/bici.jpg",
        "tags": [ "lifestyle", "motor"]
    },
    {
        "nombre": "iPhone 3GS",
        "venta": false,
        "precio": 50.00,
        "foto": "images/anuncios/iphone.png",
        "tags": [ "lifestyle", "mobile"]
    },
    {
        "nombre": "Huawie P10 lite",
        "venta": true,
        "precio": 700.00,
        "foto": "images/anuncios/huaweip10.png",
        "tags": [ "lifestyle", "mobile"]
    },
    {
        "nombre": "Toyota Yaris 2009",
        "venta": true,
        "precio": 7500.00,
        "foto": "images/anuncios/toyota09.png",
        "tags": [ "lifestyle", "motor"]
    },
    {
        "nombre": "Llaves perdidas",
        "venta": false,
        "precio": 10.00,
        "foto": "images/anuncios/llaves.png",
        "tags": [ "lifestyle", "work"]
    }
];

saveAnuncios(anuncios);