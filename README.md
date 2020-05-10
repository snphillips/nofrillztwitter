# no frillz twitter

*** IN DEVELOPMENT ***

no frillz twitter is a simple twitter client that returns recent tweets based on the user's search query. This repo contains both the node backend and javascript front-end.

## Getting Started

Clone this repo:

`git clone https://github.com/snphillips/nofrillztwitter.git`

To get the node server running, in your terminal type:

`nodemon app.js`

Open a browser window to http://localhost:3000/ where you should see a "Hello World" message.
To test if you are connecting to the twitter API, vist http://localhost:3000/tweets/bananas. You should see a json with tweets about bananas.

<img src="https://i.imgur.com/3bvGapG.png" width="500" alt="screengrab of server">
     
You can try that with any search term apended after /tweets/.


To view the front end, open index.html in a browser. If using a mac right-click on index.html, select "Reveal in Finder", then double-click the file name. A browser window should open. 

If you input a search term now, you'll likely get a CORS error. Before this app works, you'll have to address the CORS issue. I use a Chrome extension called Moesif Orign & CORS Changer. 

Read more about CORS erros here.
https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc/related?hl=en-US
https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

<img src="https://i.imgur.com/9R8ZeTH.png" width="500" alt="screengrab of server">
<img src="https://i.imgur.com/Rm7rTyO.png" width="350" alt="screengrab of server">




## Made with
- node express server (backend)
- javascript client (front end)
- Twit API
