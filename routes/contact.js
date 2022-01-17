const express = require("express");

const contactRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

contactRoutes.route("/contact").get(async function (req, res) {
  let db_connect = dbo.getDb("address");
  await db_connect.collection("contacts").find({}).toArray();
});

contactRoutes.route("/contact/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  db_connect
    .collection("contacts")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

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

// contactRoutes.route("/update/:name").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   let newvalues = {
//     $set: {
//       name: req.body.name,
// email: req.body.email,
// phone: req.body.phone,
// address: req.body.address,
//     },
//   };
//   db_connect
//     .collection("contacts")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

contactRoutes.route("/contact/:name").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.name };
  db_connect.collection("contacts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.status(obj);
  });
});

module.exports = contactRoutes;
