import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: [true, 'Nome Não Informado']
    },
    email:{
        type: String,
        required:[true, 'Senha Não Informada']
    },
    password: {
        type: String,
        require: [true, 'Senha Não Informada']
    },
    token:{
        type: String
    },
    active:{
        type: Boolean,
        default: false
    }
});

export default mongoose.model('User', user);