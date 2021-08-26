[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Site: SWAMP](https://img.shields.io/badge/site-SWAMP-blue)](http://swamp-project.org/)


# SWAMP IoT-Agent

The IoT Agent is the FIWARE module responsible to translate non-NGSI data in the NGSI
format and sent it to Orion. There  is not an official and stable IoT Agent that integrates with LoRaWAN, especially with modules from loraserver.io.As the official IoT Agent, our IoT Agent uses MongoDB to store data. However,the IoT Agent does not store every message, just some information about the
sensor/entity mapping.

In order to create a mapping between a IoT LoRa device and a entity, there is the need to inform IoT Agent about this mapping. 

# LoRaWAN Ultralight 2.0 IoT Agent

The IoT Agent is the FIWARE module responsible to translate non-NGSI data in the NGSI format and sent it to  Orion Context Broker. There is not an official and stable IoT Agent that integrates with LoRaWAN, especially with modules from [ChirpStack](https://www.chirpstack.io). 
The IoT Agent uses MongoDB to store data. However,the IoT Agent does not store every message, just some information about the sensor/entity mapping.

### Deploy

In order to instanciate the the LoRaWAN Ultralight 2.0 IoT Agent you need to run the following commands:
```
$ git clone https://git.rnp.br/swamp-essentials/swamp-iot-agent
$ cd swamp-iot-agent/
```
Then, there is the need to create a .env file to configurate the LoRaWAN Ultralight 2.0 IoT Agent. The default configurations for the docker-compose installation and deploy are:
```
NODE_PORT=3456
MQTT_BROKER='mosquitto'
MQTT_PORT=1883
DB_ADDRESS='mongo-db'
DB_PORT=27017
```
**KEY** | **VALUE**
--- | --- 
NODE_PORT | LoRaWAN Ultralight 2.0 IoT Agent port, the default is **3456**
MQTT_BROKER | The address of the MQTT broker which the IoT Agent will subscribe
MQTT_PORT | The port of the MQTT borker, the default vaule is **1883**, and 8883 for MQTT/SSL 
DB_ADDRESS | The address of the MongoDB 
DB_PORT | The MongoDB port, the default value is **27017**

#### Docker-compose Deploy - RECOMMENDED 

The docker-compose deploy of the LoRaWAN Ultralight 2.0 IoT Agent instantiates all the basic FIWARE software modules that are used in the SWAMP project. In order to run it, just follow the commands:

```
$ docker-compose build
$ docker-compose up
```

#### Stand-alone deploy

In order to do the stand-alone deploy of the LoRaWAN Ultralight 2.0 IoT Agent there is the need to especify in the .env a valid address for a Orion Context Broker, a MongoDB and a MQTT Broker. 
After it, just build and run the container. 

```
$ docker build -t swamp-iot-agent:1.0 .
$ docker run -p 3456:3456 swamp-iot-agent:1.0
```


## Configurations
In order to create a mapping between a IoT LoRa device and a Orion Entity, there is the need to inform IoT Agent about this mapping. 

```
$ curl -iX POST \
  'http://localhost:3456/iot/devices' \
  -H 'Content-Type: application/json' \
  -H 'fiware-service: openiot' \
  -H 'fiware-servicepath: /' \
  -d '{
 "devices": [
   {
     "device_id":   "device",
     "entity_name": "urn:ngsd-ld:IoTDevice:1",
     "entity_type": "LoRaSensor",
     "attributes": [
      { "object_id": "S", "name": "timestamp",  "type": "Number" },
      { "object_id": "I", "name": "identifier",  "type": "Number" },
      { "object_id": "H1", "name": "moisture1",  "type": "Number" },
      { "object_id": "H2", "name": "moisture2",  "type": "Number" },
      { "object_id": "H3", "name": "moisture3",  "type": "Number" }
     ],
	 "dev_eui": "0102030405060708",
	 "application_id": "1",
	 "broker_address":"mosquitto",
	 "orion_address": "orion"
     "entity_name": "< Entity Name in Orion >",
     "entity_type": "< Entity Type in Orion >",
     "attributes": [
     
      { "object_id": "S", "name": "timestamp",  "type": "Number" }
     ],
	 "dev_eui": "< LoRaWAN Device EUI  >",
	 "application_id": "< LoRaWAN Application ID >",
	 "broker_address":"< MQTT Broker Address >",
	 "orion_address": "< FIWARE Orion Adress >"
   }
 ]
}'
```

'http://localhost:3456/iot/devices' -> address of the running instance of the IoT Agent <br>
"entity_name": "urn:ngsd-ld:IoTDevice:1" -> name of the entity that will be created in Orion<br>
"entity_type": "LoRaSensor" -> type of the entity that will be created in Orion<br>
"dev_eui": "0102030405060708" -> device EUI of LoRa<br>
"application_id": "1" -> application ID of the sensors (LoRa app Service that provides this information)<br>
"broker_address":"mosquitto" -> address of the MQTT broker<br>
"orion_address": "orion" -> address of the Orion broker<br>

In order to check the devices in IoT Agent:
```
curl -iX GET 'http://localhost:3456/iot/devices' 
```

In order to check the devices in IoT Agent:
```
$ curl -iX GET 'http://localhost:3456/iot/devices' 
```

## License
[MIT](LICENSE)
