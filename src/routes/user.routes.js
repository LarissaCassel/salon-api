const express = require('express');
const routes = express.Router();

const User = require('../models/user');

routes.post('/', async( req, res ) => {
    try{

        const user = await new User(req.body).save();
        res.json({error: false, user});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});

module.exports = routes;