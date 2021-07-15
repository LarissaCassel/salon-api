const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedule = Schema({
    salonId:{
        type:mongoose.Types.ObjectId,
        ref: 'Salon',
        required:true
    },
    services:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'Services',
            required: true
        }
    ],
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Collaborator',
            required: true
        }
    ],
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
    },
    
});
module.exports = mongoose.model('Schedule', schedule);