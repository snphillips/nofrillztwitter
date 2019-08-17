(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);

  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // Whatever value the user selects from dropdown menu
  var searchTerm = document.getElementById("search-term").value
  // For the server call to return the previous 100 tweets
  var lowestRecentTweetId = 0;



   // ===============================
   // display search term
   // ===============================
   function displaySearchTerm(){
     document.getElementById('search-term-description').innerHTML = searchTerm
     showResultParagraph();
   }
   displaySearchTerm();



  //===============================
  // The axios call to the server
  //===============================
  // using the user's inputted query
  function axiosCall(searchTerm, lowestRecentTweetId){

    var query = searchTerm

    console.log("search-term is:", searchTerm)
    console.log("query is:", query)
    console.log("lowestRecentTweetId is:", lowestRecentTweetId)

    axios.get(`http://localhost:3000/tweets/${query}`)
    .then(function (response) {
      console.log("response is:", response);

      displayTweets(response);
      getCoordinates(response);

    })
    .catch(function (error) {
      console.log(error);
      console.log("No tweets on that topic in the past 7 days");
    });
  }
  axiosCall(searchTerm, lowestRecentTweetId);



   // ===============================
   // getting location coordinates
   // ===============================
   function getCoordinates(response){

    // console.log( "response.data.length", response.data.length )

    var coordinatesArray = [];

      for (var i = 0; i < response.data.length; i++) {

        if (response.data[i].coordinates !== null) {
          // console.log(`response.data.[` + i + `].coordinates`, response.data[i].coordinates.coordinates)
          coordinatesArray.push(response.data[i].coordinates.coordinates)
        }
      }

      console.log("coordiantesArray:", coordinatesArray)
      // document.getElementById('coordinates').innerHTML = `${coordinatesArray}`
      if (coordinatesArray.length < 1) {
        console.log("there's no location data included in the past 100 tweets")
      }
   }




  // ===============================
  // display sample tweets
  // TODO: each tweet gets it own <div> or li?
  // ===============================
  function displayTweets(response){

    console.log("response.data[0].text:", response.data[0].text)
    var tweetsArray = [];

    for (var i = 0; i < response.data.length; i++) {

      if (response.data[i].coordinates !== null) {

          tweetsArray.push(response.data[i].text)
        }
      }
     document.getElementById('sample-tweets').innerHTML = `<li>${tweetsArray}</li>`
     // displayTweet(response);
   }



    //===============================
    // Removes "display: none;" from result paragraph
    // This is invoked after
    //===============================
    function showResultParagraph() {
      document.getElementById('result-paragraph').style.display = 'block';
    }










}




}
)();
