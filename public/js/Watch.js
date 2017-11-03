function teeDiagramm() {
  /*
    Fetch annab esimeses .then klauslis ainult response objekti. See ei sisalda veel andmeid. Andmete lugemiseks kasutame json() meetodit, see on asünkroonne. Kahe .then-klausli aheldamine.
    Vt https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
  */
  fetch('https://apidemojatest.herokuapp.com/koik')
    .then(function (response) {
      return response.json();
    })
    .then(saadudJSON => {  
      console.log('Andmed saadud');
      var tulbad = tabuleeriAndmed(saadudJSON.content);
      console.log(tulbad);
      $('#Tulemus').html(tulbad.toString());
      // Tee diagramm
      let data = {
        labels: ["täna", "eile", "...", "...",
          "...", "...", "...", "...", "...", "..."],
    
        datasets: [
          {
            title: "Uuendamisi päevas", color: "gray",
            values: tulbad
          }
        ]
      };
    
      let chart = new Chart({
        parent: "#Diagramm",
        title: "Uuendamisi päevas",
        data: data,
        type: 'bar',
        height: 250
      });
      
    })
    .catch(error => {
      console.log('Andmete saamine ebaõnnestus');
    });
}

function tabuleeriAndmed(json) {
  var n = Date.now();
  var s = [];
  for (var i = 0; i < 10; i++) {
    s.push(0);
  }
  json.forEach(systeem => {
    var t = Date.parse(systeem.details.meta.creation_timestamp);
    var dd = Math.ceil((n - t) / (24 * 60 * 60 * 1000));
    // console.log(dd);
    if (dd < 10) {
      s[dd] = s[dd] + 1;
    }
  });
  return s;
}
