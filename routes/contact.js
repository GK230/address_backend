const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const contactRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
contactRoutes.route("/contact").get(function (req, res) {
  let db_connect = dbo.getDb("address");
  db_connect
    .collection("contacts")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
contactRoutes.route("/record/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: ObjectId(req.params.id) };
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
contactRoutes.route("/contact/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };
  db_connect.collection("contacts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

contactRoutes.route("/update/:name").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("contacts")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

contactRoutes.route("/:name").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("contacts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = contactRoutes;
