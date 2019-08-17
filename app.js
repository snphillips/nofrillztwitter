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
const Twit = require('twit')

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
})


// ==================================
// Twit API Call
// https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/standard-operators
// ==================================

function getTweets(req, res) {

  let lowestRecentTweetId = 0;

  let params = {
    since_id: `${lowestRecentTweetId + 1}`,
    q: `${req.params.query}
      -filter:replies
      -filter:retweets
      -filter:media
      -filter:native_video
      -filter:links
      -filter:vine
      -filter:periscope
      -filter:images
      -filter:links
      -filter:link
      -filter:instagram
      `,
    lang: 'en',
    result_type: 'recent',
    count: '100',
   }

  T.get('search/tweets', params, function(err, data, response) {
    // console.log("The query is:", query)
    res.send(data.statuses)
    parseData(err, data, response)
  })
    .then((response) => {
    // console.log("response:", data )
    console.log("params.q are", params.q)

  })
    .catch((error) => {
    console.log(error)
    res.send(`I can't find any items.`);
  });

}




// This is a callback function that returns the data when we make a search
function parseData(err, data, response) {
  // console.log("data", data)

  // Keeping track of the tweets that have coordinates
  let tweetsArrayWithCoordinates = [];
  // Keeping track of the id of the tweets returned, b/c we'll need to do an other API call
  // using the smallest number as the starting point
  let allTweetsArray = [];

  for (var i = 0; i < data.statuses.length; i++) {

    console.log("data.statuses.text:", data.statuses[i].text)
    allTweetsArray.push(data.statuses[i].id);

    if (data.statuses[i].coordinates !== null) {
      console.log(`data.statuses[` + i + `].coordinates`, data.statuses[i].coordinates)
      console.log(`data.statuses[` + i + `].id`, data.statuses[i].id)
      tweetsArrayWithCoordinates.push(data.statuses[i].id);
    }
  }
    // This is the lowest id in the set that you just retrieved with your query
    // Us this number to perform an other query for the previous 100 tweets
    console.log("tweetsArrayWithCoordinates:", tweetsArrayWithCoordinates)
    // TODO: this crashes server when tweetsArray is empty
      let lowestRecentTweetId = allTweetsArray[0]
      console.log("lowestRecentTweetId:", lowestRecentTweetId)
};









// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
