const express = require('express');
const router = express.Router();

const Services = require('../models/services');

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
module.exports = router;