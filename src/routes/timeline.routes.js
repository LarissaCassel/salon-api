import express from 'express';
import {formatDistanceToNow} from 'date-fns';

import Timeline from '../models/timeline.js';
import Collaborator from '../models/collaborator.js';

const router = express.Router();

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

        for(let i = 0; i < timeline.length; i++){

            const perfil = await Collaborator.findById(timeline[i].collaboratorId).select('name photo');
            const date = formatDistanceToNow(new Date(timeline[i].date));

            const post = {
                key: timeline[i]._id,
                image: timeline[i].photo, 
                 name: perfil.name,
                icon: perfil.photo,
                date
               };

            publication.push(post);
        }

        res.json({error:false, publication});

    }catch(err){
        res.json({error:true, message: err.message});
    }
});

export default router;