'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Reservation = require('./models/reservation');

async function seed() {
  await Reservation.create({
    name: 'Dead Line',
    date: '09/12/23',
    time: '7:30 PM',
    numberOfGuests: '2',
    userEmail: 'adnanmohamud6@gmail.com'
  });

  await Reservation.create({
    name: 'Taco Bell',
    date: '10/12/23',
    time: '6:30 PM',
    numberOfGuests: '1',
    userEmail: 'adnanmohamud6@gmail.com'
  });

  await Reservation.create({
    name: 'Wendys',
    date: '09/22/23',
    time: '7:00 PM',
    numberOfGuests: '2',
    userEmail: 'adnanmohamud6@gmail.com'
  });


  mongoose.disconnect();
}

seed();
