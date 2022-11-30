const Property = require("../models/property.model.js");

// Create and Save a new Property
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Property
  const property = new Property({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    location: req.body.location,
    guests: req.body.guests,
    beds: req.body.beds,
    baths: req.body.baths,
    amenities: req.body.amenities,
    price: req.body.price,
    main_photo: req.body.main_photo,
    side_photo: req.body.side_photo,
    email: req.body.email
  });

  // Save Tutorial in the database
  Property.create(property, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the property."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  //const title = req.query.title;

  // Search by location and price
  if (req.query.hasOwnProperty('location') && req.query.hasOwnProperty('price')) {
    const location = req.query.location;
    const price = req.query.price;
    Property.getLocationAndPrice(location, price,(err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by location/price."
        });
      else {
        console.log(`Property with location ${location} and price ${price} was found!` );
        res.send(data);
      }
    });
  }

  // Search by location
  else if (req.query.hasOwnProperty('location')) {
    const location = req.query.location;
    Property.getLocation(location, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by location."
        });
      else {
        console.log(`Property with location ${location} was found!` );
        res.send(data);
      }
    });
  }

  // Search by price
  else if (req.query.hasOwnProperty('price')) {
    const price = req.query.price;
    Property.getPrice(price, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by price."
        });
      else {
        console.log(`Property with price ${price} was found!` );
        res.send(data);
      }
    });
  }

  // Search by type
  else if (req.query.hasOwnProperty('type')) {
    const type = req.query.type;
    Property.getType(type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by property type."
        });
      else {
        console.log(`Property with type ${type} was found!` );
        res.send(data);
      }
    });
  }

  // Default (get all) search
  else  {
    const title = req.query.title;
    Property.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving properties."
        });
      else {
        console.log(`Property with ${title} title was found!`);
        res.send(data);
      }
    });

  }
};

/*
exports.findLocation = (req, res) => {
  const location = req.query.location;   // ignore/tried changing req.query.location to req.params.location

  Property.getLocation(location, (err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Error occurred while retrieving properties by location."
      });
    else {
      console.log(`Property with location ${location} was found!` );
      res.send(data);
    }
  });
};
*/

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Property.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `(findOne) Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "(findOne) Error retrieving Property with id " + req.params.id
        });
      }
    } else {
        console.log(`findOne called` );
        res.send(data);
    }
  });
};

exports.findOneLocation = (req, res) => {
  Property.findByLocation(req.params.location, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with location ${req.params.location}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Property with location " + req.params.location
        });
      }
    } else {
      console.log("findOneLocation called")
      res.send(data);
    }
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Property.updateById(
    req.params.id,
    new Property(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Property with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Property with the specified id in the request
exports.delete = (req, res) => {
  Property.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Properties from the database.
exports.deleteAll = (req, res) => {
  Property.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all properties."
      });
    else res.send({ message: `All Properties were deleted successfully!` });
  });
};
