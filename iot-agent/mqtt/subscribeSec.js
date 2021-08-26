const mqtt = require("mqtt");
const config = require("nconf");
const processor = require("../processor/process-message");
//const LoraMessage = require("../models/lora-message");

// Subscribing to a MQTT topic in which LoRa App server publishes messages for an Entity
module.exports.entityWatcher = entity => {
  let topic = `application/${entity.application_id}/device/${entity.dev_eui}/event/up`;

  console.log(`Subscribing to ${topic}`);
  var KEY = fs.readFileSync("/etc/keys/client.key");
  var CERT = fs.readFileSync("/etc/keys/client.crt");
  var CAfile = [fs.readFileSync("/etc/keys/ca.crt")];

  var options = {
    host: config.get("MQTT_BROKER"),
    port: 8883,
    protocol: "mqtts",
    protocolId: "MQIsdp",
    ca: CAfile,
    secureProtocol: "TLSv1.2",
    protocolId: "MQIsdp",
    protocolVersion: 3
  };
  
  //connecting to broker
  const client = mqtt.connect(`mqtt://${config.get("MQTT_BROKER")}`, options);

  //subscribing to configure topics
  client.subscribe(topic);

  monitoreMessage(client, entity);
};

var monitoreMessage = (client, entity) => {
  timeStamp = Math.floor(Date.now()); // sink code

  //message event
  client.on("message", (topic, message) => {
    console.log(
      `MQTT message topic: ${topic} payload:${message.toString()} time:${new Date()}`
    );
    message = JSON.parse(message.toString());
    //add to LoRa message collection
    //LoraMessage.addLoraMessage(message, (err, msg) => {
    //  if (err) throw err;
    //});

    //process a new message (translate to NGSI)
    processedMessage = processor.processMessage(entity, message, timeStamp);
  });
};
