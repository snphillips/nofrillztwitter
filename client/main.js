


  connectAirtable() {
    // fetch('https://api.airtable.com/v0/app7PVy4s4JE4IAFh/Table%201')
    // fetch('https://api.airtable.com/v0/app7PVy4s4JE4IAFh/Table%201?api_key=YOUR_API_KEY')
    fetch('https://api.airtable.com/v0/app7PVy4s4JE4IAFh/Table%201?api_key=keyd0ct3x1sOqlsUF')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ twitter: data.records });
    }).catch(err => {
      // Error 🙁
    });
  }
