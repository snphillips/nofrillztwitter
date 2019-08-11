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
// Playing with Twit package search/tweets
// ==================================

function getTweets(req, res) {

  // The search query that includes filters like no retweets, only english tweets, etc.
  // It's here to keep the GET requst neat.
  // var query = `'${req.params.query}' + 'lang:en -RT since:2019-08-06'`;

  var params = {
    q: `${req.params.query}`,
    // ultimately wont need this but keep for testing
    // since: `2019-08-04`, // REQUIRED //goes by year-month-date
    // geocode not working
    // geocode: `42.493347,-74.2310732,150mi`,
    result_type: 'recent',
    count: '100',
    // has: "profile_geo" doesn't seem to be doing anything
    has: "profile_geo",
    lang: 'en',
    retweeted: false,
    in_reply_to_screen_name: null
   }

  T.get('search/tweets', params, function(err, data, response) {
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

  // console.log("data", data)

  for (var i = 0; i < data.statuses.length; i++) {
    // console.log("data.statuses.text:", data.statuses[i].text)
    if (data.statuses[i].coordinates !== null) {
      console.log(`data.statuses[` + i + `].coordinates`, data.statuses[i].coordinates)
    }
  }
};









// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
