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

// app.get('/googleapi');



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


  var lowestRecentTweetId = 0;


  var params = {
    q: `${req.params.query}`,
    result_type: 'recent',
    count: '100',
    lang: 'en',
    // To avoid getting the same, "most recent" tweets
    since_id: `${lowestRecentTweetId + 1}`,
    // ultimately wont need this but keep for testing
    // since: `2019-08-04`, // REQUIRED //goes by year-month-date
    // has:'coordinates' not working
    has: 'coordinates',
    // has: "profile_geo" doesn't seem to be doing anythin
    has: "profile_geo",
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




// parseData function is a callback function which returns the data when we make a search
function parseData(err, data, response) {

  console.log("data", data)
  var tweetsArray = [];

  for (var i = 0; i < data.statuses.length; i++) {
    // console.log("data.statuses.text:", data.statuses[i].text)
    if (data.statuses[i].coordinates !== null) {
      console.log(`data.statuses[` + i + `].coordinates`, data.statuses[i].coordinates)
      console.log(`data.statuses[` + i + `].id`, data.statuses[i].id)
      tweetsArray.push(data.statuses[i].id);
      lowestRecentTweetId = tweetsArray[0]
    }
  }
    // This is the lowest id in the set that you just retrieved with your query
    // Us this number to perform an other query for the previous 100 tweets
    console.log("lowestRecentTweetId:", lowestRecentTweetId)
};









// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
