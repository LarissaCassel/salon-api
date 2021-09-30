import express from 'express';
const routes = express.Router();

import { 
    addDays, 
    eachDayOfInterval, 
    getDay, 
    format, 
    addMinutes, 
    isBefore, 
    parseISO } from 'date-fns';

import Collaborator from '../models/collaborator.js';
import Schedule from '../models/schedule.js';

const { INTERVAL_IN_DAYS } = process.env;

routes.get('/collaboratordates/:collaboratorId', async(req, res) => {
    try {
        const { collaboratorId } = req.params;

        const startDay = new Date(); // DATA DE HOJE
        const endDay = addDays(new Date(), INTERVAL_IN_DAYS); // ATÉ QUAL DATA VAI LISTA AS DATAS

        //DATAS NO INTERVALO DE TEMPO
        const daysOfInterval = eachDayOfInterval({ 
            start: new Date(startDay),
            end: new Date(endDay)
          });

        
        let dates = []; // LISTA DE DATAS
        const weekName = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX'];
        const agenda = await Collaborator.findById(collaboratorId).select('dayOfWeek');

        for(let i = 0; i < daysOfInterval.length; i++){ 
            const dayOfWeek = getDay(new Date(daysOfInterval[i])); // 0 -> Domingo
            const date = agenda.dayOfWeek.includes(dayOfWeek); 
            
            if(date){
                const dayFormated = format(new Date(daysOfInterval[i]), 'dd/MMM').split('/');
                dates.push({day: dayFormated[0], month: dayFormated[1], week: weekName[dayOfWeek], date: daysOfInterval[i]});
            }

        }

        res.json({ error: false, dates });
        
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});
routes.post('/collaboratorhours/:collaboratorId', async(req, res) => {
    try{

        const { collaboratorId } = req.params;
        const { date } = req.body;

        let hours = [];

        const agenda = await Collaborator.findById(collaboratorId).select('start end');
        let start = agenda.start;
        
        for(let i = 0; i <= 30; i++){
            
            const add = addMinutes(new Date(start), 30);
            start = add;
           
            const result = isBefore(new Date(add), new Date(agenda.end));
            const collaboratorSchedules = await Schedule.find({ collaboratorId, date: parseISO(`${format(new Date(date), 'yyyy-MM-dd' )}T${format(new Date(add), 'HH:mm' )}`) });

            if(result){
                if(!collaboratorSchedules[0]){
                    hours.push( { hour: format ( new Date(add), 'HH:mm'), date: parseISO(`${format(new Date(date), 'yyyy-MM-dd' )}T${format(new Date(add), 'HH:mm' )}`) } );
                }
            } 
            
        }
        
        res.json({error: false, hours});
        

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
routes.post('/', async(req, res) => {
    try{

        const schedule = await new Schedule(req.body).save();
        res.json({error: false, schedule});

    }catch(err){
        res.json({error: true, message: err.message});
    }
});
export default routes;