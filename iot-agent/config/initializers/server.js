const express = require('express');
const bodyParser = require('body-parser');
const config = require('nconf');
var app;

var start = callback => {
  app = express();
  app.use(bodyParser.json());
  
  //Initialize routes
  require('../../routes/index')(app);

  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err 
    });
    next(err);
  });

  //run server
  app.listen(config.get('NODE_PORT'));
  console.log('Running on port ' + config.get('NODE_PORT') + '...');
};

module.exports = start;
