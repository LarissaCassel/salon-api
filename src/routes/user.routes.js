import express from 'express';
import bcrypt  from 'bcrypt';
import mongoose from 'mongoose';
import nodemailer  from 'nodemailer';

import User from '../models/user.js';

const {EMAILFROM, EMAILTOKEN} = process.env;

const routes = express.Router();

routes.post('/', async( req, res ) => {
    try{
        //criptografia da senha
        const password = await bcrypt.hash(req.body.password, 10);

        const user = await new User({
            ...req.body,
            token: mongoose.Types.ObjectId(),
            password
        }).save();

        res.json({error: false, user});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
routes.post('/login', async(req, res) => {
    try{

        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        if(!user) throw new Error("Nenhum e-mail ativo encontrado");
    
        const ispasswordValid = await bcrypt.compare(password, user.password);

        if(!ispasswordValid) throw new Error("Senha Incorreta");
        
        res.json({error: false});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
routes.post('/sendemail', async(req, res) =>{

    try{
        const { email } = req.body;

        await User.findOneAndUpdate({email}, {token: mongoose.Types.ObjectId()});
        const user = await User.findOne({email}).select('token');

        //Enviar Email De Verificação
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAILFROM,
                pass: EMAILTOKEN
            }
        });
        const mailOptions = {
            from: EMAILFROM,
            to: email,
            subject: 'Resete a sua Senha',
            text: `O Seu Token De Confirmação de Email É ${user.token}`
        };
        transporter.sendMail(mailOptions, function(error){
            if (error) {
                throw new Error("Erro Ao Enviar Token Por Email");
            }
        });

        res.json({error: false});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
routes.post('/token', async(req, res) => {
    try{

        const {email, token} = req.body;
        const user = await User.findOne({email}).select('token');
        
        if(token !== user.token) throw new Error("Token Invalido");

        res.json({error: false});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
routes.post('/resetpassword', async(req, res) => {
    try{

        const { email, newPassword } = req.body;
        const cryptPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOneAndUpdate({email}, {password: cryptPassword});

        res.json({error: false, user});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});

export default routes;