// so we can use environment variables from a .env file
// into process.env
require('dotenv').config()
// Use the following:
// ${process.env.API-KEY}
// ${process.env.API-SECRET-KEY}
// ${process.env.ACCESS-TOKEN}
// ${process.env.ACEESS-TOKEN-SECRET}


// ==================================
// Express
// Henceforth, express is now app
// ==================================
const express = require('express')
const app = express()

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
app.get('/:value', (req, res, next) => {

  const { value } = req.params;

  axios.get(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.objects&access_token=${process.env.COOPER_API_TOKEN}&has_images=1&per_page=10&tag=${value}`)
  .then((response) => {
    console.log("response:", response.data )

    return res.json(response.data)
  })
  .catch((error) => {
    console.log(error)
    res.send(`I cant' find any items right now.`);
  });
});



// ==================================
// Port
// ==================================
app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;
