const express = require("express");

const userRoutes = express.Router();

//  This will help connect to the database
const dbo = require("../db/conn");

//  This helps convert the id from string to ObjectId for the _id.
const ObjectID = require("mongodb").ObjectID;

//  GET a list of all the users.
userRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("user");
  db_connect
    .collection("user")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//  GET a single user by id
userRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("user").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
