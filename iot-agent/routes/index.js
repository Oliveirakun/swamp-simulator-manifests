const express = require('express');
//transform all modules in the current folder in objects
//and passes  as a array
const routes = require('require-dir')();

module.exports = (app) => {

   //config empty route
   app.get('/', (req, res) => res.send('SWAMP IoT Agent LoRaWAN UL2.0'));

   //iterate through each child route
   Object.keys(routes).forEach( route => {
      var router = express.Router();

      // Initialize the route to add its functionality to router
      require(`./${route}`)(router);
      app.use(`/${route}`, router);
   });
}