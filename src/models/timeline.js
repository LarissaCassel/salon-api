const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const timeline = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required:true
      },
    collaboratorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required:true
    },
    photo:{
        type:String,
        required:[true, 'Não tem Imagem']
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Timeline', timeline);