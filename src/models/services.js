import mongoose from 'mongoose';
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
    collaborators:[
      {
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator'
      }
    ],
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

export default mongoose.model('Services', services);