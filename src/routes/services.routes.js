import express from 'express';
const router = express.Router();

import Services from '../models/services.js';

router.post('/', async(req, res) => {
    try{
        const service = await new Services(req.body).save();
        res.json({error:false, service});

    }catch(err){
        res.json({error:true, message: err.message});
    }
});
router.get('/salon/:salonId', async(req, res) => {
    try {
        const {salonId}  = req.params;

        const salonServices = await Services.find({
            salonId: salonId,
            status: { $ne: 'I' }
        });

        res.json({error: false, salonServices});

    } catch (err) {
        res.json({error:true, message: err.message});
    }
});
export default router;