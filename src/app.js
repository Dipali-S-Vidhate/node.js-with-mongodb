import express from "express";
import mongoose from "mongoose";
import dbConnect from "../config/db.js";
import cors from "cors";

const APP = express();
APP.use(cors());
APP.use(express.json());
dbConnect()
  .then(function () {
    console.log("DB Connected");
  })
  .catch(function (err) {
    console.log("DB Connection Failed", err);
  });

//Preparing a schema for users collection

const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
  place: String,
});

const Kitten = mongoose.model("users", kittySchema);

APP.get("/users", async (req, res) => {
  try {
    let result = await Kitten.find();
    res.status(200).send(result);
  } catch (err) {
    res.status(403).send(err);
  }
});

APP.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    await Kitten.create(req.body);
    res.status(201).send({ msg: "User Added in DB" });
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

APP.delete("/users/:userid", async (req, res) => {
  console.log(req.params.userid);
  try {
    await Kitten.findByIdAndDelete(req.params.userid);
    res.status(201).send({ msg: "User Deleted from DB" });
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

APP.put("/users/:userid", async (req, res) => {
  console.log(req.body, req.params.userid);
  try {
    await Kitten.findByIdAndUpdate(req.params.userid, req.body);
    res.status(201).send({ msg: "User Updated from DB" });
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
});

APP.listen(4003, function () {
  console.log("Application Started");
});
