// ==================================
// So we can use environment variables from a .env file
// into process.env
// ==================================
require('dotenv').config()


// ==================================
// allows Cross-Origin Resource Sharing (CORS)
// ==================================
const cors = require('cors')


// ==================================
// Express
// Henceforth, express is now app
// ==================================
const express = require('express')
const app = express()



const port = 3000

// ==================================
// importing Twit
// ==================================
const Twit = require('twit')

app.use(cors())

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

// not defined in here
// lowestRecentTweetId isn't working
// console.log("Hello", `${lowestRecentTweetId}`)

  let params = {
    count: '100',
    // max_id: 1159679678929490000 - 1,
    // since_id: `${lowestRecentTweetId + 1}`,
    // q: `${req.params.query} -filter:retweets`,
    q: `${req.params.query} -filter:replies -filter:retweets -filter:media -filter:native_video -filter:links -filter:vine -filter:periscope -filter:images -filter:links -filter:link -filter:instagram`,
    lang: 'en',
    result_type: 'recent',
   }

  T.get('search/tweets', params, function(err, data, response) {
    // console.log("The query is:", query)
    res.send(data.statuses)
    parseData(err, data, response)
  })
    .then((response) => {
    // console.log("response:", data )

  })
    .catch((error) => {
    console.log(error)
    res.send(`I can't find any items.`);
  });

}



// This is a callback function that returns the data when we make a search
function parseData(err, data, response) {

  console.log("data", data.statuses[0])


  // Keeping track of the tweets that have coordinates, to map
  let tweetsArrayWithCoordinates = [];

  // Keeping track of the id of the tweets returned, b/c we'll need to do an other API call
  // using the smallest number as the starting point
  let allTweetsArray = [];

  for (var i = 0; i < data.statuses.length; i++) {

    // console.log(`data.statuses[` + i + `].text:`, data.statuses[i].text)
    console.log(`data.statuses[` + i + `].user.location`, data.statuses[i].user.location)
    // console.log(`data.statuses[` + i + `].user.location`, data.statuses[i].user.geo)
      // console.log(`data.statuses[` + i + `].coordinates`, data.statuses[i].coordinates)
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

      let lowestRecentTweetId = allTweetsArray[allTweetsArray.length - 1]
      console.log("lowestRecentTweetId:", lowestRecentTweetId)
};




// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
