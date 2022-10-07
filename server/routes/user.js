const express = require("express");
const bcrypt = require("bcrypt");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the users.
userRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
//
//
// This section will help you get a single user by id
//
userRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
//
//
// This section will help you create a new user.
//
userRoutes.route("/user/add").post(async (req, response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let db_connect = dbo.getDb();
    let myobj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      gender: req.body.genderOptions,
      city: req.body.city,
      about: req.body.about,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  } catch {
    res.status(500).send();
  }
});
//
//
// Verify password by email.
//
userRoutes.route("/").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { email: ObjectId(req.params.email) };
  console.log(req.params.email);
  db_connect.collection("users").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
  if (myquery == null) {
    return res.status(400).send("Can not find user");
  }
  try {
    bcrypt.compare(req.body.password, myquery.password);
  } catch {
    res.status(500).send;
  }
});

// This section will help you update a user by id.
userRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      gender: req.body.gender,
      city: req.body.city,
      about: req.body.about,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a user
userRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = userRoutes;
