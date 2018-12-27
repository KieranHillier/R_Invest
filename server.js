const axios = require('axios');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

let stockIndex = 0
const stockArray = ['GOOGL', 'TWTR', 'FB', 'AMAZN']

setInterval(() => {  

  if (stockIndex > (stockArray.length - 1)) {
    stockIndex = 0
  }

  const stockCurrent = stockArray[stockIndex]
  stockIndex++ 

  console.log(stockCurrent)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCurrent}&interval=60min&apikey=7MEEDQQFFWLGDYBH`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, 10000);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});