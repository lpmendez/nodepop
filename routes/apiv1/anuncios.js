const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');
const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');

/**
 * GET /
 * lista todos los anuncios
*/
router.use(jwtAuthMiddleware())
router.get('/', async (req, res, next) =>{
    try{
        const type = req.query.type;
        const tags = req.query.tags;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const nombre = req.query.nombre;
        
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;

        const filter = {};

        if(type === "venta")
            filter.venta = true;
        else if(type ==="busqueda")
            filter.venta = false;

        if(tags){
            filter.tags = tags;
        }

        if(nombre){
            filter.nombre = new RegExp('/^'+nombre, "i");
        }
        
        if(minPrice || maxPrice){
            const range = {};
            if(minPrice){
                range.$gt = minPrice;
            }
            if(maxPrice){
                range.$lt = maxPrice;
            }
            filter.precio = range;
        }

        
        
        const query = Anuncio.find(filter);
        query.limit(limit);
        query.skip(skip);
        query.sort(sort);

        const list = await query.exec();
        res.json({ success: true, result: list });
    }
    catch(err){
        next(err);
        return;
    }
});

module.exports = router;