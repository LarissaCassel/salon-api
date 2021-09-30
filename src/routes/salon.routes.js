import express from 'express';
import {getDay, format, isAfter, isBefore } from 'date-fns';

const router = express.Router();
import Salon from '../models/salon.js';

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

        const week = getDay(new Date()); // 0 -> Domingo
        const today = format(new Date(), 'HH:mm').split(':'); 
    
        const salon = await Salon.findById(req.params.id).select( 'name logo address.city openingHours' );

        const open = format(new Date(salon.openingHours[week].open), 'HH:mm').split(':');
        const close = format(new Date(salon.openingHours[week].close), 'HH:mm').split(':');

        const after = isAfter(new Date(2021, 6, 11, today[0], today[1]), new Date(2021, 6, 11, open[0], open[1]));
        const before = isBefore(new Date(2021, 6, 11, today[0], today[1]), new Date(2021, 6, 11, close[0], close[1]));

        const status = after && before ? 'ABERTO' : 'FECHADO';
        const salonData = { salonName: salon.name, salonLogo: salon.logo,city: salon.address.city, status};
        
        res.json({error: false, salonData}); 

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
export default router;