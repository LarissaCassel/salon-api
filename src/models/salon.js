import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const salon = new Schema({
    name: {
        type: String,
        required: [true, 'Nome é Obrigatório']
    },
    logo: String, 
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
   openingHours:[
        {
            open: Date,
            close: Date
        }
    ],
    address:{
        street: {
            type: String,
            required: [true, 'Rua é Obrigatório']
        },
        street_number:{
            type: String,
            required:[true, 'Número é Obrigatório']
        },
        state:{
            type:String,
            required:[true, 'Estado é Obrigatório']
        },
        city:{
            type:String,
            required:[true, 'Cidade é Obrigatório']
        },
        neighborhood:{
            type:String,
            required:[true, 'Bairro é Obrigatório']
        },
        zipcode:{
            type:String,
            required:[true, 'CEP é Obrigatório']
        },
        complementary: String // nao obrigatorio
    }, 
    date: {
        type: Date,
        default: Date.now(),
    }   
});
salon.index({geo: '2dsphere'});

export default mongoose.model('Salon', salon);