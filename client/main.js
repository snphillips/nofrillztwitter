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

    console.log("search-term is:", searchTerm)
    console.log("lowestRecentTweetId is:", lowestRecentTweetId)

    axios.get(`http://localhost:3000/tweets/${searchTerm}`)
    .then(function (response) {
      console.log("response is:", response);

      displayLocation(response);
      getLocation(response);

    })
    .catch(function (error) {
      console.log(error);
      console.log("No tweets here. Could be an error or could be there are no tweets");
    });
  }
  axiosCall(searchTerm, lowestRecentTweetId);



   // ===============================
   // getting location coordinates
   // ===============================
   function getLocation(response){

    // console.log( "response.data.length", response.data.length )

    var locationArray = [];

      for (var i = 0; i < response.data.length; i++) {

        if (response.data[i].location !== null) {
          // console.log(`response.data.[` + i + `].location`, response.data[i].user.location)
          locationArray.push(response.data[i].user.location)
        }
      }

      console.log("locationArray:", locationArray.length, locationArray)
      // document.getElementById('location').innerHTML = `${locationArray}`
      if (locationArray.length < 1) {
        console.log("there's no location data included in the past 100 tweets")
      }
   }




  // ===============================
  // display location
  // TODO: each tweet gets it own <div> or li?
  // ===============================
  function displayLocation(response){

    console.log(`response.data[i].user.location:`, response.data[0].user.location)
    var locationArray = [];

    for (var i = 0; i < response.data.length; i++) {

      // this should only put locations in the array when there IS a location
      // right now it's putting empty strings in there too.
      if (response.data[i].user.location !== ' ') {

          locationArray.push(response.data[i].user.location)
        }
      }
     document.getElementById('sample-tweets').innerHTML = `${locationArray}`
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
