// so we can use environment variables from a .env file
// into process.env
require('dotenv').config()
// Use the following:
// ${process.env.API-KEY}
// ${process.env.API-SECRET-KEY}
// ${process.env.ACCESS-TOKEN}
// ${process.env.ACEESS-TOKEN-SECRET}

const cors = require('cors')


// ==================================
// Express
// Henceforth, express is now app
// ==================================
const express = require('express')
const app = express()

app.use(cors())

const port = 3000

// ==================================
// importing Twit
// ==================================
var Twit = require('twit')

// ==================================
// index route
// ==================================
app.get('/', (req, res, next) => {
  res.send(`Hello World! Let's forage`)
})

app.get('/tweets/:query', getTweets);


//this is the object of twit which will help us to call functions inside it
var T = new Twit({
  consumer_key:         `${process.env.API_KEY}`,
  consumer_secret:      `${process.env.API_SECRET_KEY}`,
  access_token:         `${process.env.ACCESS_TOKEN}`,
  access_token_secret:  `${process.env.ACEESS_TOKEN_SECRET}`,
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


// ==================================
// Playing with Twit package
// ==================================
// const forageThing  = 'chanterelles';
function getTweets(req, res) {

   var query = req.params.query;

  T.get('search/tweets', { q: `${query} -RT since:2019-08-05 `, count: 1, }, function(err, data, response) {
    console.log("The query is:", query)
    res.send(data.statuses)
    parseData(err, data, response)
  })
    .then((response) => {
    console.log("response:", data )

  })
  .catch((error) => {
    console.log(error)
    res.send(`I can't find any items right now.`);
  });


}


// searchedData function is a callback function which returns the data when we make a search
function parseData(err, data, response) {
  // console.log("searchedData is:", data);
  console.log("data.statuses[0].text:", data.statuses[0].text)
  console.log("data.statuses[0].geo:", data.statuses[0].geo)
  console.log("data.statuses[0].place:", data.statuses[0].place)
  console.log("data.statuses[0].coordinates:", data.statuses[0].coordinates)
}


// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
