'use strict';

const axios = require('axios');
const aiAPIKey = process.env.OPENAI_API_KEY;

const headers = {
  Authorization: `Bearer ${aiAPIKey}`,
};

const getAIData = async (req, res) => {
  const { criteria, data } = req.body;
  console.log(data);
  console.log(criteria);
  let parsedData = JSON.parse(data);
  console.log(parsedData);
  const model = 'gpt-3.5-turbo';
  const prompt = `Filter the following array of restaurants that have ${criteria} on their menu: ${data}`;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', { model, messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }] }, { headers });
    const filteredData = response.data.choices[0].message.content;
    res.json({ filteredData });
    console.log(filteredData);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = getAIData;
