(function() {

// this works. keep for now
// fetch(`http://localhost:3000/art-deco`)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(response) {
//     parseData(response)
//     console.log("JSON.stringify(response)", JSON.stringify(response));
//   })
//   .then(function(response) {
//   });

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
)();
