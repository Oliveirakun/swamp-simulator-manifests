Entity = require("../models/entity");
Attribute = require("../models/attribute");
processor = require("../processor/process-message");
subscriber = require("../mqtt/subscribe");

module.exports = router => {
  //TODO improve iot API

  //get entity by id
  router.route("/devices/id/:_id").get((req, res) => {
    Entity.getEntityById(req.params._id, (err, msg) => {
      if (err) throw err;
      else res.json(msg);
    });
  });

  //path to register a new entity
  router
    .route("/devices")
    .get((req, res) => {
      Entity.getEntity((err, msg) => {
        if (err) throw err;
        else res.json(msg);
      });
    })
    .post((req, res) => {
      let msg = req.body.devices[0];
      let temp = Entity.getEntityByName(msg.entity_name);
      if (Entity.getEntityByName(msg.entity_name) == undefined) {
        Entity.addEntity(msg, (err, msg) => {
          if (err) throw err;
          else {
            res.json(msg);
            for (attribute of msg.attributes) {
              console.log(attribute);
              attribute.entity = msg.entity_name;
              Attribute.addAttribute(attribute, (err, attribute) => {
                if (err) throw err;
              });
            }
            processor.createEntity(msg);
            subscriber.entityWatcher(msg);
          }
        });
      } else{
        let err_msg = "DUPLICATE ENTITY - There is already an ENTITY with the same name: "+ msg$
        console.log(err_msg);
        res.json({ error : err_msg});
      }
    });
};