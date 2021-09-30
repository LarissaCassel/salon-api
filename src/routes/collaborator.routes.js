import express from 'express';
const router = express.Router();

import Collaborator from '../models/collaborator.js';

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
router.post('/list', async(req, res) => {
    try{

        const { collaborators } = req.body;
        
        let collaboratorList = [];

        for(let i = 0; i < collaborators.length; i++){
            const collaboratorPerfil = await Collaborator.findById(collaborators[i]).select('photo name');
            collaboratorList.push(collaboratorPerfil);
        }

        res.json({ error:false, collaboratorList });

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
export default router;