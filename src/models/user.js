const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: [true, 'Diga o seu Nome']
    },
    email:{
        type: String,
        required:[true, 'Diga o seu Nome']
    },
    phone: {
        type: String,
        require: [true, 'Telefone Não Informado']
    }
});

module.exports = mongoose.model('User', user);