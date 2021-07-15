const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collaborator = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é Obrigatório']
    },
    photo: String, 
    email:{
        type: String,
        required: [true, 'E-mail é Obrigatório']
    },
    password: {
        type: String,
        required:[true, 'Senha é Obrigatório']
    },
    phone:{
        type: String,
        required:[true, 'Telefone é Obrigatório']
    },
    birthDate:{
        type: String
    },
    status:{
        type: String,
        required:true,
        enum:['A', 'I'],
        default:'A'
    },
    date: {
        type: Date,
        default: Date.now(),
    }   
});

module.exports = mongoose.model('Collaborator', collaborator);