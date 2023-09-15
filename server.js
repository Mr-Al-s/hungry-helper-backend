"use strict";

console.log("Hello World");

// require
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Define port and validate .env is running
const PORT = process.env.PORT || 3002;

// bringing in mongoose
const mongoose = require("mongoose");

// bring in code from model
const Reservation = require("./models/reservation");
const getYelpData = require("./modules/restaurant.js");
console.log(getYelpData);
const getAIData = require("./modules/filteredRestaurant");

// use
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// bring in auth code
const verifyUser = require("./auth");

// add validation to confirm we are wired up to mongoDB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection.error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

// connect mongoose to mongoDB
mongoose.connect(process.env.DB_URL);

// Routes
app.use(verifyUser);
app.get('/restaurant', getYelpData);
app.delete("/reservations/:id", deleteReservations);
app.post('/filteredRestaurant', getAIData);
app.put("/reservations/:id", putReservations);
app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/reservations", getReservations);
app.post("/reservations", postReservations);


async function getReservations(req, res, next) {
  console.log('searching for user', req.user);
  const email = req.user.email;
  console.log('req object --------->>>>>>', email);
  try {
    let results = await Reservation.find({userEmail: email});
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    next(error);
  }

}

async function postReservations(req, res, next) {
  const email = req.user.email;
  try {
    let createdReservation = await Reservation.create({...req.body, userEmail: email});
    res.status(200).send(createdReservation);
  } catch (err) {
    next(err);
  }
}

async function deleteReservations(req, res, next) {
  try {
    let id = req.params.id;
    await Reservation.findByIdAndDelete(id);
    res.status(200).send("reservation deleted");
  } catch (err) {
    next(err);
  }
}

async function putReservations(req, res, next) {
  console.log('hit put reservations')
  const email = req.user.email;
  try {
    let id = req.params.id;
    let reservationFromReq = {...req.body, userEmail: email};
    let options = {
      new: true,
      overwrite: true,
    };
    let updatedReservation = await Reservation.findByIdAndUpdate(id, reservationFromReq, options);
    res.status(200).send(updatedReservation);
  } catch (err) {
    next(err);
  }
}


app.get("*", (request, response) => {
  response.status(200).send("welcome");
});

// errors
app.get((error, request, response) => {
  response.status(500).send(error.message);
});

// listen
app.listen(PORT, () => console.log(`listening on ${PORT}`));
