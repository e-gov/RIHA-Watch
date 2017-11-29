function alusta() {
  leiaSysteemid();
}

function leiaSysteemid() {
  fetch('https://apidemojatest.herokuapp.com/systeeme')
    .then(function (response) {
      return response.json();
    })
    .then(saadudJSON => {
      $('#Teade').addClass('peidetud');
      kuvaArutelud(saadudJSON.totalElements);
      leiaArutelud(saadudJSON.content);
    })
    .catch(error => {
      console.log('leiaSysteemid: Andmete saamine ebaõnnestus');
    });
}

function leiaArutelud(systeemideNimekiri) {
  for (var i = 0; i < systeemideNimekiri.length; i++) {
    /* Päri süsteemiga seotud arutelud */
    var u = 'https://apidemojatest.herokuapp.com/arutelud?s=' + systeemideNimekiri[i].details.short_name;
    console.log(systeemideNimekiri[i].details.short_name);
    fetch(u)
      .then(function (response) {
        return response.json();
      })
      .then(saadudJSON => {
        kuvaArutelud(saadudJSON);
      })
      .catch(error => {
        console.log('leiaArutelud: error: ' + error.toString());
      });
  } 
}

function kuvaArutelud(json) {
  var p = $("p").html(json.toString()).appendTo('#Arutelud');
}