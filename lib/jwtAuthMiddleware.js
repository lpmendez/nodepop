'use strict';

const jwt = require('jsonwebtoken');

//funcion que crea un middleware de autenticación jwt
module.exports = () =>{
    return (req, res, next) =>{
        //recogemos el token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-acceess-token')

        if(!token){
            const error = new Error('no token provided');
            error.status = 401;
            next(error);
        }

        //verificando token
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenDescodificado)=>{
            if(err){
                next(new Error('invalid token'));
                return;
            }
            req.user_id = tokenDescodificado.user_id;
            next();
        });
    };
}