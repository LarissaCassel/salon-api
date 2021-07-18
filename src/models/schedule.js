const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedule = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    collaboratorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required:true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    },
    paymentMethod:{
        type: String,
        enum: ['Online', 'Local'],
        required:true
    },
    date: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Schedule', schedule);