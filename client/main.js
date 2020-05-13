(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);


  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // clears the previous lookup of tweets
  clearPreviousTweets()

  // Whatever value the user selects from dropdown menu
  var searchTerm = document.getElementById("search-term").value


  //===============================
  // The axios call to the server
  //===============================
  // using the user's inputted query
  function axiosCall(searchTerm){

    console.log("Main.js: The search-term is:", searchTerm)

    // Server when in development:
    // var server = `http://localhost:3000/tweets/`

    // Server when in production:
    var server = `https://nofrillztwitter.herokuapp.com/tweets/`

    console.log("Main.js: The server is:", server)

    axios.get(`${server} + ${searchTerm}`)


    .then(function (response) {

      console.log("The response is:", response);
      console.log("The response.data is:", response.data);

      //here in the promise, we display the tweets
      displayTweets(response);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(searchTerm);


  // ===============================
  // clears the list of tweets
  // ===============================
  function clearPreviousTweets() {
    // Removes an element from the document
    var tweetsList = document.getElementById('tweet-list');

    // As long as <ul> has a child node, remove it
   while (tweetsList.hasChildNodes()) {
     tweetsList.removeChild(tweetsList.firstChild);
   }

  }



  // ===============================
  // display a list of tweets
  // ===============================
  function displayTweets(response){

    // console.log(`response.data[0].text:`, response.data[0].text)

    for (var i = 0; i < response.data.length; i++) {

      function listSingleTweet(element) {
        return document.createElement(element);
      }

      function append(parent, el) {
        return parent.appendChild(el);
      }

      var ul = document.getElementById('tweet-list');
      var li = listSingleTweet('li');
      var span = listSingleTweet('span');

      var tweetBody = response.data[i].text


      // if there are tweets
      if (tweetBody.includes(`${searchTerm}`)) {
        span.innerHTML = `${response.data[i].text}`

        append(li, span);
        append(ul, li);

        }
      }

   }



}

}
)();
