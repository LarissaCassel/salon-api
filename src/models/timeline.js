import mongoose from 'mongoose';
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
        required:[true, 'Imagem']
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Timeline', timeline);