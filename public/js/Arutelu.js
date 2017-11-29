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
      kuvaString(saadudJSON.totalElements + ' süsteemi');
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
    fetch('https://apidemojatest.herokuapp.com/arutelud')
      .then(function (response) {
        return response.json();
      })
      .then(saadudJSON => {
        kuvaString(saadudJSON.vastus);
      })
      .catch(error => {
        console.log('leiaArutelud: error: ' + error);
      });
  } 
}

function kuvaString(s) {
  $('p').text(s).appendTo('#Arutelud');
}