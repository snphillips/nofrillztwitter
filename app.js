//  express is the library that makes this all possible
const express = require('express')

//  Invoke express. Henseforth, app = express
const app = express()

const port = 3000

app.get('/', (req, res) => res.send(`Hello World!! Let's forage for Chanterelles`))
app.listen(port, () => console.log(`App listening on port ${port}!`))
