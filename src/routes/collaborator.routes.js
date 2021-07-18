const express = require('express');
const router = express.Router();

const Collaborator = require('../models/collaborator');

//CRIAR COLABORADOR
router.post('/', async(req, res) => {
    try {

        const {email, phone} = req.body;
        
        const collaboratorExist = await Collaborator.findOne({
           $or:[
               { email },
               { phone }
           ]
        });

        if(!collaboratorExist){
            const newCollaborator = await new Collaborator(req.body).save();
            res.json({ error:false, newCollaborator}); 
        }else{
            res.json({error:true, message:'Já existe um colaborador registrado com este email ou telefone'});
        }  

    } catch (err) {
        res.json({error:true, message:err.message});
    }
});
router.get('/list', async(req, res) => {
    try{

        const { collaborators } = req.body;
        
        let collaboratorList = [];

        for(collaborator of collaborators ){
            const collaboratorPerfil = await Collaborator.findById(collaborator).select('photo name');
            collaboratorList.push(collaboratorPerfil);
        }

        res.json({ error:false, collaboratorList });

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
module.exports = router;