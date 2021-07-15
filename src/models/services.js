const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const services = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required:true
      },
    name:{
        type: String,
        required:true
    },
    price:{
        type:String,
        required:[true, 'Preço Não Informado']
    },
    duration:{
        type:String,
        required:[true, 'Duração Não Informado']
    },
    status: {
        type: String,
        enum: ['A', 'I'],
        required: true,
        default: 'A',
      },
      date: {
        type: Date,
        default: Date.now()
      },
});

module.exports = mongoose.model('Services', services);