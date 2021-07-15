const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Timeline = require('../models/timeline');
const Collaborator = require('../models/collaborator');

router.post('/', async(req, res) => {
    try {

        const publication = await new Timeline(req.body).save();
        res.json({error:false, publication});
        
    } catch (err) {
        res.json({error:true, message: err.message});
    }
});

router.get('/salon/:salonId', async(req, res) => {
    try{

        const { salonId } = req.params;

        const timeline = await Timeline.find({
            salonId
        }).select('collaboratorId photo _id date');

        let publication = [];
       
        for(post of timeline){
            const { collaboratorId, photo, _id, date } = post;
            const collaboratorPerfil = await Collaborator.findById(collaboratorId).select('name photo');
            const collaboratorPost = {key:_id, image:photo, name:collaboratorPerfil.name, icon:collaboratorPerfil.photo, date};
            publication.push(collaboratorPost);
            
        }
    
        res.json({error:false, publication});

    }catch(err){
        res.json({error:true, message: err.message});
    }
});

module.exports = router;