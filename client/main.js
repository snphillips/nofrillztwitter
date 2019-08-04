(function() {

  document.getElementById("button").addEventListener("click", lookupForageThing);

  // The mega function that does it all when user clicks the submit button
  function lookupForageThing() {


  //===============================
  // The API call to Open Weather
  //===============================
  // This axios call is made to the Open Weather Map API,
  // using the user's inputted zip.
  function axiosCall(){
    axios.get('http://localhost:3000/art-deco', {
          params: {
          ID: 12345
      }
    })
    .then(function (response) {
      console.log("console.log response:", response);
      parseData(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  axiosCall();





   // ===============================
   // Parsing the data from the returned JSON
   // ===============================
   function parseData(response){

     document.getElementById('number-of-tweets').innerHTML = `${response.data.objects[0].decade} `
     document.getElementById('forage-thing').innerHTML = `${response.data.objects[0].type} `
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
