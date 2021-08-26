const nconf = require("nconf");
const async = require("async");
const param = require("./param");

//Load Environment variables from .env file
require("dotenv").config({path:__dirname+'.env'});
nconf.use("memory");
nconf.env().argv();

//Load application modules
const server = require("./config/initializers/server");
const db = require("./config/initializers/database");
const subscribe = require("./mqtt/subscribe");

//initializing MongoDB and loading Entities from database
async.series([ callback => db(callback) , param.loadEntities], function(err) {
  if (err) console.log("Initialization failed" + err);
  else console.log("Initialized SUCCESSFULLY");
});


//initializing modules
server(()=>{});
