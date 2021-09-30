import 'dotenv/config'; 
import './src/services/database.js';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import salonRoutes from './src/routes/salon.routes.js';
import servicesRoutes from './src/routes/services.routes.js';
import collaboratorRoutes from './src/routes/collaborator.routes.js';
import timelineRoutes from './src/routes/timeline.routes.js';
import scheduleRoutes from './src/routes/schedule.routes.js';
import userRoutes from './src/routes/user.routes.js'

const {PORT} = process.env;

const app = express();

app.use(express.json());
app.use(morgan('dev')); 
app.use(cors());

//routes
app.use('/salon', salonRoutes); 
app.use('/services', servicesRoutes);
app.use('/collaborator', collaboratorRoutes);
app.use('/timeline', timelineRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/user', userRoutes);

app.set('port', PORT);
app.listen(app.get('port'), () => {
    console.log(`API RODANDO ${app.get('port')}`);
});