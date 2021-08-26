const mongoose = require("mongoose");

// Raw LoRa message data model

const loraMessageSchema = mongoose.Schema({
  applicationID: {
    type: String
  },
  applicationName: {
    type: String
  },
  deviceName: {
    type: String
  },
  devEUI: {
    type: String
  },
  txInfo: {
    type: Object
  },
  adr: {
    type: Boolean
  },
  fCnt: {
    type: Number
  },
  fport: {
    type: Number
  },
  data: {
    type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

const loraMessage = (module.exports = mongoose.model(
  "loraMessage",
  loraMessageSchema
));

//Get LoRaMessage
module.exports.getLoraMessage = (callback, limit) => {
  console.log("Getting all the LoRa Messages");
  loraMessage.find(callback).limit(limit);
};

//Get LoRaMessage by id
module.exports.getLoraMessageById = (_id, callback) => {
  console.log("Get LoRa Messages by id:" + _id);
  loraMessage.findById(_id, callback);
};

//post new LoRaMessage
module.exports.addLoraMessage = (msg, callback) => {
  console.log("Adding new LoRa Message:" + JSON.stringify(msg));
  loraMessage.create(msg, callback);
};

// Delete LoRaMessage
module.exports.removeLora

Message = (_id, callback) => {
  let query = { _id: _id };
  loraMessage.remove(query, callback);
};
