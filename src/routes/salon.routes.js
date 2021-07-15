const express = require('express');
const router = express.Router();
const Salon = require('../models/salon');

//CRIAR UM SALAO 
router.post('/', async(req, res) => {
    try {

        const salon = await new Salon(req.body).save();
        res.json({ error:false, salon }); 
        
    } catch (err) {
        res.json({error:true, messsage: err.messsage});
    }
});

//INFORMAÇÕES DO SALÃO
router.get('/:id', async (req, res) => {
    try{

        const response = await Salon.findById(req.params.id).select( 'name photo address.city');
        res.json({error: false, response});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
module.exports = router;