const express = require('express');
const routes = express.Router();

const addDays = require('date-fns/addDays');
const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const getDay = require('date-fns/getDay');
const format = require('date-fns/format');
const formatISO = require('date-fns/formatISO');

const DateTime = require('../models/dateTime');
const Collaborator = require('../models/collaborator');

const { INTERVAL_IN_DAYS } = process.env;

routes.post('/', async(req, res) => {
    try {

        const dateTime = await new DateTime(req.body).save();

        res.json({error:false, dateTime});
        
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});
routes.get('/dates/:salonId', async(req, res) => {
    try {

        const startDay = new Date(); // DATA DE HJ
        const endDay = addDays(new Date(), INTERVAL_IN_DAYS); // ATÉ QUAL DATA VAI LISTA AS DATAS
        const daysOfInterval = eachDayOfInterval({ // ARRAY DA DATAS
            start: new Date(startDay),
            end: new Date(endDay)
          });

        let dates = []; // LISTA DE DATAS
        
        const { salonId } = req.params;
        const { servicesId } = req.body;

        const dateTime = await DateTime.find({salonId}).select('dayOfWeek collaborators');
        const weeks = dateTime[0].dayOfWeek; // ARRAYS COM OS DIAS DA SEMANA 
        const weekName = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX'];

          for(day of daysOfInterval){
              const dayOfWeek = getDay(new Date(day));
              const date = weeks.includes(dayOfWeek);
              if(date){
                  const dateIso = formatISO(new Date(day));
                  const dayFormat = format(new Date(dateIso), 'dd/MM');
                  dates.push({date: dayFormat,week: weekName[dayOfWeek]});
              }
          }
          
          //colaborador
          let collaboratorActives = [];

          const collaborators = dateTime[0].collaborators;
          for(collaborator of collaborators){
              const collaboratorPerfil = await Collaborator.findById(collaborator).select('name photo');
              collaboratorActives.push(collaboratorPerfil);

          }

        res.json({error: false, dates, collaboratorActives});
        
    } catch (err) {
        res.json({error: true, message: err.message});
    }
});
module.exports = routes;