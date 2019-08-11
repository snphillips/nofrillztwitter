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
      parseData(response)
    })
    .then(function (response) {
      // parseData(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(query);



   // ===============================
   // display query
   // ===============================
   function displayQuery(response){
     document.getElementById('query-description').innerHTML = query
   }
     displayQuery();


   // ===============================
   // display location coordinates
   // TODO: get to work
   // ===============================
   function displayLocationCoordinates(response){
     console.log("data.statuses[0].coordinates", response.data[14].coordinates)
     document.getElementById('location').innerHTML = `${response.data[14].coordinates}`
   }
     displayLocationCoordinates();


   // ===============================
   // Parsing the data from the returned JSON
   // ===============================
   function parseData(response){
     console.log("response.data[0].text:", response.data[0].text)
     // document.getElementById('tweet-number').innerHTML = `${response.data[0].search_metadata.count} `
     document.getElementById('sample-tweet').innerHTML = `${response.data[0].text}`
     showResultParagraph();
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
