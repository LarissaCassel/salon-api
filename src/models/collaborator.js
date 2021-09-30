import mongoose from 'mongoose';
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
    dayOfWeek: {
        type: [Number], //array de numeros com os dias da semana
        required: true
    },
    start: {
        type: Date, // Horario inicial do atendimento
        required: true,
    },
    end: {
        type: Date, //Horario final do Antendimento
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    }   
});

export default mongoose.model('Collaborator', collaborator);