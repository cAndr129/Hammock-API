const properties = require("../controllers/property.controller");

module.exports = app => {
  const properties = require("../controllers/property.controller.js");

  const router = require("express").Router();

  // Create a new Property
  router.post("/", properties.create);

  // Retrieve all Properties
  router.get("/", properties.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", properties.findOne);

  // Retrieve a single Property with location
  router.get('/:location', properties.findOneLocation);

  // Update a Tutorial with id
  router.put("/:id", properties.update);

  // Delete a Tutorial with id
  router.delete("/:id", properties.delete);

  // Delete all Properties
  router.delete("/", properties.deleteAll);

  app.use('/api/properties', router);

};
