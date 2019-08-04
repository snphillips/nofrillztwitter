(function() {

  document.getElementById("button").addEventListener("click", lookupForageThing);

  // The mega function that does it all when user clicks the submit button
  function lookupForageThing() {

  // Whatever value the user selects from dropdown menu
  var forageThing = document.getElementById("forage-thing").value


  //===============================
  // The axios call to the server
  //===============================
  // This axios call is made to the Open Weather Map API,
  // using the user's inputted zip.
  function axiosCall(forageThing){

    console.log("forageThing is:", forageThing)

    axios.get(`http://localhost:3000/${forageThing}`)
    .then(function (response) {
      console.log("response:", response);
      parseData(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall(forageThing);





   // ===============================
   // Parsing the data from the returned JSON
   // ===============================
   function parseData(response){

     document.getElementById('number-of-tweets').innerHTML = `${response.data.objects[0].decade} `
     document.getElementById('forage-thing-description').innerHTML = `${response.data.objects[0].type} `
     document.getElementById('location').innerHTML = `${response.data.objects[0]["woe:country_name"]}`
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
