'use strict';

// bring in mongoose here
const mongoose = require('mongoose');

// extract the schema
const { Schema } = mongoose;

// create a book schema
const reservationSchema = new Schema({
  name: {type: String, required: true},
  image:{type: String, required: true},
  address:{type: String, required: true},
  price:{type: String, required: true},
  date: {type: String, required: true},
  time: {type: String, required: true},
  numberOfGuests: {type: String, required: true},
  userEmail: {type: String, required: true}
});

// create a model and tell the model about the rules AKA schema
const ReservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationModel;
