'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Usuario = require('../../models/Usuario')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * POST /usuarios/login
 * Autentica con usuario
 */
router.post('/authenticate', async (req, res, next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        // buscamos el usuario
        const usuario = await Usuario.findOne({ email: email }).exec();
        
        if(!usuario){
            res.json({ success: false, error: 'invalid credentials'});
            return;
        }


        const compare = await bcrypt.compare(password, usuario.password);
        if( !compare){
            res.json({ success: false, error: 'invalid credentials'});
            return;
        }
        //crear token
        jwt.sign({ user_id: usuario._id }, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRATION
        }, (err, token) =>{
            if(err){
                next(err);
                return;
            }
            res.json({success: true, result: token})
        })
    }
    catch(err){
        next(err);
        return;
    }
})

/**
 * POST /registrar
 * Registra un nuevo usuario
 */
router.post('/registrar', async (req, res, next)=>{
    try{
        const usuarioData = req.body;
        //encriptando password
        usuarioData.password = await bcrypt.hash(usuarioData.password, saltRounds);

        const usuario = new Usuario(usuarioData);
        await usuario.save();
        
        res.json({  success: true  });
    }
    catch(err){
        next(err);
        return;
    }
});

module.exports = router;