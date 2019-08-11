(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);

  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // Whatever value the user selects from dropdown menu
  var query = document.getElementById("query").value



   // ===============================
   // updateQuery
   // ===============================
   function updateQuery(){
     document.getElementById('query-description').innerHTML = query
     showResultParagraph();
   }
   updateQuery();



  //===============================
  // The axios call to the server
  //===============================
  // using the user's inputted query
  function axiosCall(query){

    console.log("query is:", query)

    axios.get(`http://localhost:3000/tweets/${query}`)
    .then(function (response) {
      console.log("response is:", response);
      displayTweets(response);
      getCoordinates(response);
      displayTweets(response);
    })
    .then(function (response) {
      // parseData(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(query);



   // // ===============================
   // // display query
   // // ===============================
   // function displayQuery(response){
   //   document.getElementById('query-description').innerHTML = query
   // }
   //   displayQuery();


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
        console.log("there's no location data included in the past 100 tweets aobut", query)
      }
   }


  // ===============================
  // display sample tweets
  // TODO: each tweet gets it own div or li
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
