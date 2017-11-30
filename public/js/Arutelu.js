function alusta() {
  leiaSysteemid();
}

function leiaSysteemid() {
  fetch('https://apidemojatest.herokuapp.com/koik')
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
    var sn = systeemideNimekiri[i].details.short_name;
    var u = 'https://apidemojatest.herokuapp.com/arutelud?s=' + sn;
    console.log(u);
    fetch(u)
      .then(function (response) {
        return response.json();
      })
      .then(saadudJSON => {
        if (saadudJSON.totalElements > 0) {
          kuvaString(sn + ': ' + saadudJSON.totalElements.toString());
        }
      })
      .catch(error => {
        console.log('leiaArutelud: error: ' + error);
      });
  } 
}

function kuvaString(s) {
  var t = $('#Arutelud').html();
  $('#Arutelud').html(t + '<br>' + s);
}