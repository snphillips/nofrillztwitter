# no frillz twitter

no frillz twitter is a simple twitter client that returns recent tweets based on the user's search query. This repo contains both the node backend and front-end.

## Getting Started

Clone this repo:

`git clone https://github.com/snphillips/nofrillztwitter.git`

To get the node server running, in your terminal type:

`nodemon app.js`

Open a browser window to http://localhost:3000/ where you should see a "Hello World" message.
To test if you can connect to the twitter API, vist http://localhost:3000/tweets/bananas. You should see a json with tweets about bananas.
https://i.imgur.com/3bvGapG.png  You can try that with any search term apended after /tweets/.
To view the front end, open index.html in a browser. If using a mac right-click on index.html, select "Reveal in Finder", then double-click the file name. A browser window should open. 


## Made with
- node express server
- javascript client
- Twit API
