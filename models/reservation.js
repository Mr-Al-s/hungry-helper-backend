'use strict';

// bring in mongoose here
const mongoose = require('mongoose');

// extract the schema
const { Schema } = mongoose;

// create a book schema
const reservationSchema = new Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  time: {type: Number, required: true},
  numberOfGuests: {type: Number, required: true}
});

// create a model and tell the model about the rules AKA schema
const ReservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationModel;
