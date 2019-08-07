(function() {

  document.getElementById("button").addEventListener("click", lookupQuery);

  // The mega function that does it all when user clicks the submit button
  function lookupQuery() {

  // Whatever value the user selects from dropdown menu
  var query = document.getElementById("query").value


  //===============================
  // The axios call to the server
  //===============================
  // This axios call is made to the API,
  // using the user's inputted query
  function axiosCall(query){

    console.log("query is:", query)

    axios.get(`http://localhost:3000/tweets/${query}`)
    .then(function (response) {

    //response is not coming home

      console.log("response:", response);
      parseData(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(query);





   // ===============================
   // Parsing the data from the returned JSON
   // ===============================
   // function parseData(response){

   //   document.getElementById('number-of-tweets').innerHTML = `${response.data.objects[0].decade} `
   //   document.getElementById('query-description').innerHTML = `${response.data.objects[0].type} `
   //   document.getElementById('location').innerHTML = `${response.data.objects[0]["woe:country_name"]}`
   //   showResultParagraph();
   // }

   function parseData(response){

     document.getElementById('tweet-number').innerHTML = `${response.data.statuses[0].text} `
     document.getElementById('query-description').innerHTML = `${query} `
     document.getElementById('location').innerHTML = `${response.data.statuses[0].goe}`
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
