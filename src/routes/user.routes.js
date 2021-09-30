import express from 'express';
const routes = express.Router();

import User from '../models/user.js';

routes.post('/', async( req, res ) => {
    try{

        const user = await new User(req.body).save();
        res.json({error: false, user});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});

export default routes;