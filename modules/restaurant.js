'use strict';

const axios = require('axios');


const yelpAPIKey = process.env.YELP_API_KEY;


const getYelpData = async (req, res) => {
  console.log(req.query);
  try{
    const {lat, lon} = req.query;
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
    const headers = {
      Authorization: `Bearer ${yelpAPIKey}`,
    };
    const response = await axios.get(yelpUrl, { headers });
    console.log(response.data.businesses[0].categories);
    const yelpArr = response.data.businesses.map(restaurant => new Yelp(restaurant));
    res.status(200).send(yelpArr);
  } catch(e) {
    return Promise.reject(e);
  }
};

class Yelp {
  constructor(restaurant) {
    this.image_url = restaurant.image_url;
    this.name = restaurant.name;
    this.address = `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`;
    this.price = restaurant.price;
    this.food = restaurant.categories;
    this.phone = restaurant.display_phone;
  }
}

module.exports = getYelpData;
