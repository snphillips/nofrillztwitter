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

  // The search query that includes filters like no retweets, only english tweets, etc.
  // It's here to keep the GET requst neat.
  // var query = `'${req.params.query}' + 'lang:en -RT since:2019-08-06'`;

  var params = {
    q: `${req.params.query}`,
    since: `2019-08-06`, // REQUIRED //goes by year-month-date
    // geocode: '33.743450,-84.393138,1mi',
    result_type: 'recent',
    count: '100',
    lang: 'en',
    retweeted: false,
    in_reply_to_screen_name: null,
   }


  T.get('search/tweets', params, function(err, data, response) {
  // T.get('search/tweets', { q: `${query}`, count: 1 }, function(err, data, response) {
    // console.log("The query is:", query)
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
  console.log("searchedData is:", data);
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
