const mongoose = require("mongoose");

// Entity data model

const entitySchema = mongoose.Schema({
  device_id: {
    type: String,
    required: true
  },
  entity_name: {
    type: String,
    required: true
  },
  entity_type: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  },
  application_id: {
   type: String,
   required: true
 },
 attributes:{
    type: Object,
    required: true
 },
 dev_eui: {
   type: String,
   required: true
 },
 broker_address:{
    type: String,
    required: true
 },
 orion_address:{ 
    type: String,
    required:true
 }
});

const entity = (module.exports = mongoose.model(
  "entity",
  entitySchema
));

//Get all entities
module.exports.getEntity = (callback, limit) => {
  console.log("Getting all the ENTITIES");
  entity.find(callback).limit(limit);
};

//Get Entity by id
module.exports.getEntityById = (_id, callback) => {
  console.log("Get ENTITY by id:" + _id);
  Entity.findById(_id, callback);
};

//Get Entity by Device id
module.exports.getEntityByDevice = (device, callback) => {
  console.log("get ENTITY by Device:" + device);
  Entity.find({ device_id: device }, callback);
};

//get Entity by type
module.exports.getEntityByType = (type, callback) => {
  console.log("Get ENTITY by type:" + type);
  Entity.find({ entity_type: type }, callback);
};

//get messages by Name
module.exports.getEntityByName = (name, callback) => {
  console.log("Get ENTITIES by topic:" + name);
  Entity.find({ entity_name: name}, callback );
};

//post new Entity
module.exports.addEntity = (msg, callback) => {
  console.log("Adding new ENTITY:" + JSON.stringify(msg));
  Entity.create(msg, callback);
};

// Delete Entity
module.exports.removeEntity = (_id, callback) => {
   console.log("Removing ENTITY...");
    let query = {_id: _id};
    Entity.remove(query, callback);
 }