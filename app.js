// ==================================
// So we can use environment variables from a .env file
// into process.env
// ==================================
require('dotenv').config()


// ==================================
// Express
// Henceforth, express is now app
// ==================================
const express = require('express')
const app = express()


// ==================================
// CORS
// npm package to allow cross origin resource sharing
// ==================================
const cors = require('cors')
app.use(cors())

var corsOptions = {
  origin: 'https://nofrillztweets.surge.sh',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



// ==================================
// Body-parser captures data coming via a form.
// npm package that allows forms to work
// ==================================
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// ==================================
// The port
// ==================================
const port = process.env.PORT || 3000


// ==================================
// importing Twit
// ==================================
const Twit = require('twit')



// ==================================
// index route
// note we have cors(corsOptions)
// ==================================
app.get('/', cors(corsOptions), (req, res, next) => {
  // res.send(`Hello World! Let's look at no frillz tweets`)
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/tweets/:searchTerm', getTweets);


//this is the object of twit which will help us to call functions inside it
var T = new Twit({
  consumer_key:         `${process.env.API_KEY}`,
  consumer_secret:      `${process.env.API_SECRET_KEY}`,
  access_token:         `${process.env.ACCESS_TOKEN}`,
  access_token_secret:  `${process.env.ACEESS_TOKEN_SECRET}`,
})


// ==================================
// Some variables
// ==================================
let allTweetsIdArray = [];
let lowestRecentTweetId;
  // // Keeping track of the tweets that have coordinates, to potentially map
let tweetsArrayWithCoordinates = [];


// ==================================
// Twit API Call
// https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/standard-operators
// ==================================

function getTweets(req, res) {

// TODO: add to the query non-truncated tweets
  let params = {
    count: '100',
    max_id: `${lowestRecentTweetId - 1}`,
    q: `${req.params.searchTerm} -filter:replies -filter:retweets -filter:media -filter:native_video -filter:links -filter:vine -filter:periscope -filter:images -filter:links -filter:instagram -filter:twimg -from:${req.params.searchTerm}`,
    // q: `${req.params.searchTerm} -filter:replies -filter:retweets -filter:media -filter:native_video -filter:links -filter:vine -filter:periscope -filter:images -filter:links -filter:instagram -filter:twimg`,
    lang: 'en',
    result_type: 'recent',

    origin: 'https://nofrillztweets.surge.sh',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
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

// ==================================
// This is a callback function that returns the data when we make a search
// ==================================
function parseData(err, data, response) {

  console.log("data", data.statuses[0])
  console.log("lowestRecentTweetId", lowestRecentTweetId)


  for (var i = 0; i < data.statuses.length; i++) {


    console.log(`data.statuses[` + i + `] id:`, data.statuses[i].id, `coordinates:`, data.statuses[i].coordinates, `text:`,data.statuses[i].text)

    // Keeping track of all status ids (to later find the smallest value)
    allTweetsIdArray.push(data.statuses[i].id);

    // if the user shares coordinates, then put those tweets into an array
    if (data.statuses[i].coordinates !== null) {
      console.log(`data.statuses[` + i + `].coordinates`, data.statuses[i].coordinates)
      console.log(`data.statuses[` + i + `].id`, data.statuses[i].id)
      tweetsArrayWithCoordinates.push(data.statuses[i].id);
    }
  }
    // This is the lowest id in the set that you just retrieved with your query
    // Us this number to perform an other query for the previous 100 tweets
    console.log("tweetsArrayWithCoordinates:", tweetsArrayWithCoordinates)

      lowestRecentTweetId = allTweetsIdArray[allTweetsIdArray.length - 1]

      console.log("allTweetsIdArray:", allTweetsIdArray)
      console.log("lowestRecentTweetId:", lowestRecentTweetId, "allTweetsIdArray.length:", allTweetsIdArray.length)
};


// ==================================
// Error Handlers
// ==================================
app.use((err, req, res, next) => {
  res.json(err);
  res.status(500).send('Oh no a 500 error.')
});

app.use((req, res, next) => {
  res.status(404).send(`Oh no a 404 error. I can't find that.`)
})

// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
