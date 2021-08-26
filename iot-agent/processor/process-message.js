const publisher = require("../publisher/publisher");

module.exports.processMessage = (entity, message) => {
  //LoRa code messages using base64, now we are going to decode to ascii
  decoded_data = decode64toAscii(message.data);
  decoded_data = decoded_data.replace("\u0000", ""); //remove null
  //translate LoRa JSON to NGSI JSON
  ngsi_message = struture_attributes(decoded_data, entity);

  //send NGSI message to Orion Context Broker
  publisher.updateEntity(
    ngsi_message,
    entity.orion_address,
    entity.entity_name
  );
};

//Create a new entity in Orion Context Broker
module.exports.createEntity = entity => {
  ngsi_message = strutureCreateEntity(entity);
  publisher.createEntity(ngsi_message, entity.orion_address);
};

decode64toAscii = data => new Buffer(data, "base64").toString("ascii");

struture_attributes = (attr, entity) => {
  let attributes_structured = {};
  let split_data = attr.split("|");
  for (let i = 0; i <= split_data.length; i++) {
    if (i % 2 == 0) {
      for (attribute of entity.attributes) {
        if (attribute.object_id == split_data[i]) {
          let temp = { value: split_data[++i], type: attribute.type };
          attributes_structured[attribute.name] = temp;
        }
      }
    }
  }

  attributes_structured["IoTimestamp"] = {
    value: (new Date().getTime()).toString(),
    type: "Number"
  };
  return attributes_structured;
};

strutureCreateEntity = entity => {
  let attributes_structured = {};
  attributes_structured.id = entity.entity_name;
  attributes_structured.type = entity.entity_type;
  attributes_structured.timezone = entity.timezone;
  for (attribute of entity.attributes) {
    let temp = { value: {}, type: attribute.type };
    attributes_structured[attribute.name] = temp;
  }
  attributes_structured["IoTimestamp"] = {
    value: (new Date().getTime()).toString(),
    type: "Number"
  };
  return attributes_structured;
};
