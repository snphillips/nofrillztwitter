// https://www.sitepoint.com/single-page-app-without-framework/


(function() {


fetch(`http://localhost:3000/art-deco`)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    parseData(response)
    console.log("JSON.stringify(response)", JSON.stringify(response));
  })
  .then(function(response) {
  });



   // ===============================
   // Parsing the data from the returned JSON
   // ===============================
   function parseData(response){

     console.log("hello from parseData")
     console.log("TEST response.objects[0].title:", response.objects[0].title)
     document.getElementById('test01').innerHTML = `title: ${response.objects[0].title} `
     document.getElementById('test02').innerHTML = `year_acquired: ${response.objects[0].year_acquired} `
     document.getElementById('test03').innerHTML = `decade: ${response.objects[0].decade} `
     document.getElementById('test04').innerHTML = `medium: ${response.objects[0].medium} `
     document.getElementById('test05').innerHTML = `description: ${response.objects[0].description} `

   }















}
)();
