import mongoose from 'mongoose';
const {DATABASE_URI} = process.env;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(DATABASE_URI)
.then( () => console.log('DATABASE IS UP!') )
.catch( (err) => console.log(`ERRO DATABASE: ${err}`) );
