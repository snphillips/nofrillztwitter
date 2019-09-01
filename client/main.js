(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);


  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // Whatever value the user selects from dropdown menu
  var searchTerm = document.getElementById("search-term").value


   // ===============================
   // display search term
   // ===============================
   function displaySearchTerm(){
     document.getElementById('search-term-description').innerHTML = searchTerm
     // showResultParagraph();
   }
   displaySearchTerm();



  //===============================
  // The axios call to the server
  //===============================
  // using the user's inputted query
  function axiosCall(searchTerm){

    console.log("the search-term is:", searchTerm)


    axios.get(`http://localhost:3000/tweets/${searchTerm}`)
    .then(function (response) {
      console.log("the response is:", response);

      displayTweets(response);
    })
    .catch(function (error) {
      console.log(error);
      console.log("No tweets here. Could be an error or could be there are no tweets");
    });
  }
  axiosCall(searchTerm);



  // ===============================
  // display tweets
  // TODO: each tweet gets it own <div> or li?
  // ===============================
  function displayTweets(response){

    console.log(`response.data[0].text:`, response.data[0].text)
    console.log(`response.data[1].text:`, response.data[1].text)

    var tweetsArray = [];

    for (var i = 0; i < response.data.length; i++) {

      // this should only put locations in the array
      if (response.data[i].text !== ' ') {

          tweetsArray.push(response.data[i].text)
        }
      }
     document.getElementById('twitter-feed').innerHTML = `${tweetsArray}`
     // displayTweets(response);
   }



}




}
)();
