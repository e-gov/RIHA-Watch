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
    console.log('Andmed saadud');
    kuvaArutelud(saadudJSON.totalElements);
    leiaArutelud(saadudJSON.content);
  })
  .catch(error => {
    console.log('Andmete saamine ebaõnnestus');
  });
}

function leiaArutelud(systeemideNimekiri) {
  systeemideNimekiri.forEach(systeem => {
    /* Päri süsteemiga seotud arutelud */
    fetch('https://apidemojatest.herokuapp.com/arutelud?s=' + systeem.details.short_name)
    .then(function (response) {
      return response.json();
    })
    .then(saadudJSON => {
      kuvaArutelud(saadudJSON);
    })
    .catch(error => {
      console.log('Andmete saamine ebaõnnestus');
    });
  }
}

function kuvaArutelud(json) {
  var p = $("p").html(json.toString()).appendTo('#Arutelud');
}