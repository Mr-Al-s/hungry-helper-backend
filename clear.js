'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Reservation = require('./models/reservation');

async function clear () {
  try {
    await Reservation.deleteMany({});
    console.log('reservations cleared from DB');
  } catch (err) {
    console.error(err);

  } finally {
    mongoose.disconnect();
  }

}

clear();
