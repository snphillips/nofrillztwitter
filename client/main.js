



(function() {

  // When the button is clicked, execute the function lookupQuery
  document.getElementById("button").addEventListener("click", lookupQuery);




  //===============================
  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

    // clears the previous lookup of tweets
    clearPreviousTweets()

    // Whatever value the user types into the search field
    var searchTerm = document.getElementById("search-term").value


  //===============================
  // The axios call to the server
  // using the user's inputted query as searchTerm
  //===============================
  function axiosCall(searchTerm){

    console.log("Main.js: The search-term is:", searchTerm)

    // show the spinner
    document.querySelector("#loader").style.display = "block";

    var server = ''
    // when in development:
    // server = `http://localhost:3000/tweets/`
    // when in production:
    server = `https://nofrillztwitter.herokuapp.com/tweets/`

    console.log("Main.js: The server is:", server)

    axios.get(`${server} + ${searchTerm}`)


    .then(function (response) {

      // The tweets are ready, so hide the spinner
      document.querySelector("#loader").style.display = "none";

      // console.log("The response is:", response);
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

    console.log("removing previous tweets")


    // As long as <ul> has a child node, remove it
   while (tweetsList.hasChildNodes()) {
     tweetsList.removeChild(tweetsList.firstChild);
   }

  }



  // ===============================
  // display a list of tweets
  // ===============================
  function displayTweets(response){


    // if there are no tweets
    // instead of inserting the list of tweets into #tweet-list,
    // insert the "no tweet" message
    if (response.data.length === 0) {

        // let noTweets = document.querySelector("#result");
        let noTweets = document.querySelector("#tweet-list");
        noTweets.innerHTML = "There are no tweets with that search term."
    }

    // console.log(`response.data[0].text:`, response.data[0].text)

    for (var i = 0; i < response.data.length; i++) {

      function listSingleTweet(element) {
        return document.createElement(element);
      }

      function append(parent, element) {
        return parent.appendChild(element);
      }

      // Now using the functions we just described above...
      var li = listSingleTweet('li');
      var span = listSingleTweet('span');

      var ul = document.getElementById('tweet-list');

      var tweetBody = response.data[i].text


      // if there are tweets
      if (tweetBody.includes(`${searchTerm}`)) {
        append(li, span);
        span.innerHTML = `${response.data[i].text}`
        append(ul, li);
      }

   }
}
}
}
)();






















