# no frillz tweetz

no frillz tweetz is a simple twitter client that returns recent tweets based on the user's search query. This repo contains both the node/express back-end and javascript front-end. The front-end is in the directory called client.  View the app here: https://nofrillztweets.surge.sh/

<img src="https://i.imgur.com/dofkpVD.png" width="500" alt="screengrab of server">
<img src="https://i.imgur.com/ZQAZZob.png" width="300" alt="screengrab of server">

## But Why?
Q: Isn't this just a _worse_ Twitter client that _does less_ than real twitter?

A: Yes.



## Getting Started

Clone this repo:

`git clone https://github.com/snphillips/nofrillztwitter.git`

To get the node server running, in your terminal type:

`nodemon app.js`

Open a browser window to http://localhost:3000/ where you should see a "Hello World" message.
To test if you are connecting to the twitter API, visit http://localhost:3000/tweets/bananas. You should see a json with tweets about bananas.

<img src="https://i.imgur.com/3bvGapG.png" width="500" alt="screengrab of server">
     
You can try that with any search term appended after /tweets/.


To view the front end, open *index.html* in a browser. 
If using a mac, right-click on index.html, select "Reveal in Finder", then double-click the file name. A browser window should open. 


## Made with
- node express server (back-end)
- javascript client (front end)
- Twit API
