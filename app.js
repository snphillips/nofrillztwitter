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
// Axios - npm package promise based HTTP client
// ==================================
const axios = require('axios');


// ==================================
// Error Handlers
// TO DO: get to work
// ==================================
// app.use((err, req, res, next) => {
//   res.json(err);
//   res.status(500).send('Oh no a 500 error.')
// });

// app.use((req, res, next) => {
//   res.status(404).send(`Oh no a 404 error. I can't find that.`)
// })


// ==================================
// index route
// ==================================
app.get('/', (req, res, next) => {
  res.send(`Hello World! Let's forage for Chanterelles`)
})

// ==================================
// Get All - First an API that
// ==================================
app.get('/:forageThing', (req, res, next) => {

  const { forageThing } = req.params;

  axios.get(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=${process.env.COOPER_API_TOKEN}&has_images=1&per_page=1&tag=${forageThing}`, {
          params: {
          API_SECRET_KEY: `${process.env.API_SECRET_KEY}`,
          API_KEY: `${process.env.API_KEY}`,
          ACCESS_TOKEN: `${process.env.ACCESS_TOKEN}`,
          ACEESS_TOKEN_SECRET: `${process.env.ACEESS_TOKEN_SECRET}`
      }})
  .then((response) => {
    console.log("response:", response.data )

    return res.json(response.data)
  })
  .catch((error) => {
    console.log(error)
    res.send(`I can't find any items right now.`);
  });
});



// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
