const axios = require('axios');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//if doesnt work try removing the ./ 
var serviceAccount = require("./bloop-89289-firebase-adminsdk-dzf09-d41d86860f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bloop-89289.firebaseio.com"
});

const db = admin.firestore();

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

let stockIndex = 0
const stockArray = ['GOOGL', 'TWTR', 'FB', 'AMZN']

setInterval(() => {  

  if (stockIndex > (stockArray.length - 1)) {
    stockIndex = 0
  }

  let finalObj = {}
  const stockCurrent = stockArray[stockIndex]
  stockIndex++ 

  console.log(stockCurrent)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCurrent}&interval=5min&apikey=7MEEDQQFFWLGDYBH`)
    .then(response => {
      //console.log(response.data);
      const data = response.data
      const timeSeries = data['Time Series (5min)']
      const newSymbol = data['Meta Data']['2. Symbol']
      const searchDate = data['Meta Data']['3. Last Refreshed']

      let newTime = ''
      let newData = []
      let newObj = {}
      let newPrice = 0

      const currentDate = new Date(searchDate)
      const currentDay = currentDate.getDay()
      const dateConverted = currentDate.toLocaleDateString('en-US')

      for (var time in timeSeries) {

        const activeDate = new Date(time)
        const activeDay= activeDate.getDay()

        if (activeDay != currentDay) {
          break
        }

        const activeHour = activeDate.getHours()
        const activeMinutes = activeDate.getMinutes()
        newTime = `${activeHour}:${activeMinutes}`

        newPrice = Number(timeSeries[time]['4. close'])
        newObj = {
          time: newTime,
          closing_price: newPrice
        }
        newData.push(newObj)
      }

      const closingPrice = newData[0].closing_price
      const startingPrice = newData[newData.length - 1].closing_price
      const differencePrice = closingPrice - startingPrice
      const differencePercentagePrice = differencePrice / startingPrice * 100

      const fixedPrice = Math.round((differencePrice + 0.00001) * 100) / 100
      const fixedPercentagePrice = Math.round((differencePercentagePrice + 0.00001) * 100) / 100

      finalObj = {
        symbol: newSymbol,
        date: dateConverted,
        intraday: newData,
        closingPrice: closingPrice,
        startingPrice: startingPrice,
        differencePrice: fixedPrice,
        differencePercentagePrice: fixedPercentagePrice
      }

    })
    .then(() => {
      //add to firebase database
      console.log(finalObj)

      const docRef = db.collection('stocks').doc(finalObj.symbol);

      //send data to firebase
      const date = docRef.set({
        daily: {
          symbol: finalObj.symbol,
          date: finalObj.date,
          intraday: finalObj.intraday,
          closingPrice: finalObj.closingPrice,
          startingPrice: finalObj.startingPrice,
          differencePrice: finalObj.differencePrice,
          differencePercentagePrice: finalObj.differencePercentagePrice
        }
      });

    })
    .catch(error => {
      console.log(error);
    });
}, 100000);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// GET route for GOOG data
app.get('/goog', (req, res) => {

  const docRef = db.collection('stocks').doc('GOOGL');
  const getDoc = docRef.get()
    .then((doc) => {
      (!doc.exists) ? res.send({ data: 'no document'}) : res.send({ data: doc.data()})
    })
    .catch((err) => {
      res.send({ data: 'error occured'})
    })

  //res.send({ response: 'good shit homie'})
})

// GET data for all Hot Stocks
// add a check to see if all stocks exists
app.get('/hotStocks', (req, res) => {

  const stocksRef = db.collection('stocks');
  const allStocks = stocksRef.get()
    .then(snapshot => {
      const allData = []
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        allData.push(doc.data())
      });
      res.send({ data: allData })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

})