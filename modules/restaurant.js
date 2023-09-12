'use strict';

const axios = require('axios');


const yelpAPIKey = process.env.YELP_API_KEY;
// const aiAPIKey = process.env.OPENAI_API_KEY;
console.log('inside restaurant.js', yelpAPIKey);


const getYelpData = async (req, res) => {
  console.log('is this working?');
  try{
    const {lat, lon} = req.query;
    console.log(req.query);
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
    console.log('yelp URL key:', yelpUrl);
    const headers = {
      Authorization: `Bearer ${yelpAPIKey}`,
    };
    const response = await axios.get(yelpUrl, { headers });
    console.log(response.data.businesses);
    const yelpArr = response.data.businesses.map(restaurant => new Yelp(restaurant));
    console.log(yelpArr);
    res.status(200).send(yelpArr);
  } catch(e) {
    return Promise.reject(e);
  }
};

// const getAIData = async (req, res) => {
//   try{
//     aiUrl = ``;
//     const headers = {
//       Authorization: `Bearer ${aiAPIKey}`,
//     };
//     const aiArr = await axios.get(aiUrl, { headers });
//     res.status(200).send(aiArr);
//   } catch(e) {
//     return Promise.reject(e);
//   }
// };

class Yelp {
  constructor(restaurant) {
    this.image_url = restaurant.image_url;
    this.name = restaurant.name;
    this.address = `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`;
    this.price = restaurant.price;
  }
}

module.exports = getYelpData;
