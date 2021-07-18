require('dotenv/config'); 
const {PORT} = process.env;
require('./src/services/database');

const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev')); 
app.use(cors());

//routes
app.use('/salon', require('./src/routes/salon.routes')); 
app.use('/services', require('./src/routes/services.routes'));
app.use('/collaborator', require('./src/routes/collaborator.routes'));
app.use('/timeline', require('./src/routes/timeline.routes'));
app.use('/schedule', require('./src/routes/schedule.routes'));
app.use('/user', require('./src/routes/user.routes'));

app.set('port', PORT);
app.listen(app.get('port'), () => {
    console.log(`API RODANDO ${app.get('port')}`);
});