const nconf = require("nconf");

module.exports = (router) => {
  router.route("/").get((req, res) => {
    console.log("Performing health check...");
    res.json({
      version: nconf.get("APP_VERSION"),
      status: true,
    });
  });
};
