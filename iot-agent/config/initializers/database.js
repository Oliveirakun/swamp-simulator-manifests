const config = require("nconf");
const mongoose = require("mongoose");

module.exports = callback => {
  //initializing database
  console.log("connecting to database... \n");
  setTimeout(() => {
    mongoose.connect(
      `mongodb://${config.get("DB_ADDRESS")}:${config.get("DB_PORT")}/swamp`
    );
    const db = mongoose.connection;
  }, 5000);

  callback();
};
