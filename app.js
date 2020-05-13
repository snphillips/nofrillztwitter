// ==================================
// So we can use environment variables from a .env file
// into process.env
// ==================================
require('dotenv').config()


// ==================================
// CORS
// npm package to allow cross origin resource sharing
// ==================================
const cors = require('cors')

// ==================================
// Express
// Henceforth, express is now app
// ==================================
const express = require('express')
const app = express()




app.use(cors())

const corsOptions = {
  // origin: `https://nofrillztweets.surge.sh/`,
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



// ==================================
// Body-parser captures data coming via a form.
// npm package that allows forms to work
// ==================================
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// ==================================
// set the port, either from an environmental variable or manually
// ==================================
const port = process.env.PORT || 3000;


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
  res.json({
    msg: 'Hello World!',
    msg2: 'This is CORS-enabled',
  })
})

app.get('/tweets/:searchTerm', cors(corsOptions), getTweets);


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
// let allTweetsIdArray = [];
// let lowestRecentTweetId;
  // Keeping track of the tweets that have coordinates, to potentially map
// let tweetsArrayWithCoordinates = [];


// ==================================
// Twit API Call
// https://developer.twitter.com/en/docs/tweets/rules-and-filtering/overview/standard-operators
// ==================================

function getTweets(req, res) {

// TODO: add to the query non-truncated tweets, if possible
  let params = {
    count: '100',
    // max_id: `${lowestRecentTweetId - 1}`,
    q: `${req.params.searchTerm} -filter:replies -filter:retweets -filter:media -filter:native_video -filter:links -filter:vine -filter:periscope -filter:images -filter:links -filter:instagram -filter:twimg -from:${req.params.searchTerm}`,
    lang: 'en',
    result_type: 'recent',
    //cors experiment
    // origin: 'https://nofrillztweets.surge.sh'
   }



  T.get('search/tweets', params, function(err, data, response) {
    console.log("The query is:", `${req.params.searchTerm}`)
    res.send(data.statuses)
    // parseData(err, data, response)
  })
    .then((response) => {

    // test
    return res.json(response.data)
    console.log("response from T.get:", data )

  })
    .catch((error) => {
      console.log("error:", error)
      console.log("error.response.data", error.response.data);
      console.log("error.response.status", error.response.status);
      console.log("error.response.headers", error.response.headers);
    res.send(`I can't find any items.`);
  });

}



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
