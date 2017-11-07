var andmetabel = [];
var lNimed = []; // Loodud süsteemide nimed
var uNimed = []; // Uuendatud süsteemide nimed

function genereeriKuupaevad(n) {
  /*
    Genereerib massiivi n viimase kuupäevaga (kuupäev.kuu vormingus), alates tänasest. Samuti algväärtustab massiivid lNimed ja uNimed.
  */
  var tana = new Date();
  for (var i = 0; i < 10; i++) {
    var kp =
      tana.getDate().toString() + '.' +
      (tana.getMonth() + 1).toString();
    andmetabel.push({
      kp: kp,
      loodud: 0,
      uuendatud: 0
    });
    tana.setDate(tana.getDate() - 1);
    lNimed.push('');
    uNimed.push('');
  }
}

function tabuleeriAndmed(json) {
  /*
    Läbib JSON-struktuuri json, täites massiivi andmetabel.
  */
  var praegu = new Date();
  json.forEach(systeem => {
    var ct = Date.parse(systeem.details.meta.creation_timestamp);
    var ut = Date.parse(systeem.details.meta.update_timestamp);
    const paevaPikkus = 24 * 60 * 60 * 1000;
    var paeviLoomisest = Math.ceil((praegu - ct) / paevaPikkus);
    var paeviUuendamisest = Math.ceil((praegu - ut) / paevaPikkus);
    if (paeviLoomisest < 10) {
      andmetabel[paeviLoomisest].loodud++;
      lNimed[paeviLoomisest] = lNimed[paeviLoomisest] + systeem.details.name + ' ' + systeem.details.short_name + '; ';
    }
    if (paeviUuendamisest < 10) {
      andmetabel[paeviUuendamisest].uuendatud++;
      uNimed[paeviUuendamisest] = uNimed[paeviUuendamisest] + systeem.details.name + ' ' + systeem.details.short_name + '; ';
    }
  });
}

function laeAndmedTeeDiagramm() {
  /*
    Fetch annab esimeses .then klauslis ainult response objekti. See ei sisalda veel andmeid. Andmete lugemiseks kasutame json() meetodit, see on asünkroonne. Kahe .then-klausli aheldamine.
    Vt https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
  */
  fetch('https://apidemojatest.herokuapp.com/koik')
    .then(function (response) {
      return response.json();
    })
    .then(saadudJSON => {
      $('#Teade').addClass('peidetud');
      console.log('Andmed saadud');
      tabuleeriAndmed(saadudJSON.content);
      joonistaDiagramm();
    })
    .catch(error => {
      console.log('Andmete saamine ebaõnnestus');
    });
}

function joonistaDiagramm() {
  // Moodusta Google Charts andmetabel.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Kp');
  data.addColumn('number', 'Uusi');
  data.addColumn('number', 'Uuendatud');
  andmetabel.forEach( rida => {
    data.addRow([rida.kp, rida.loodud, rida.uuendatud]);
  });
  // Set chart options
  var options = {
    'title': 'Infosüsteeme',
    'fontName': 'AnonymousPro',
    'fontSize': 13,
    'width': 800,
    'height': 300,
    'legend': {
      'position': 'top',
      'maxLines': 3,
      'fontSize': 13
    },
    'isStacked': true,
    'series': [{ color: 'tomato' }, { color: 'khaki' }],
    'tooltip': { 'trigger': 'selection' }
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('Diagramm'));
  chart.draw(data, options);
  google.visualization.events.addListener(chart, 'select', () => {
    var lahter = chart.getSelection()[0];
    var r = lahter.row;
    var c = lahter.column;
    if (c == 1) {
      $('#Detailid').html(uNimed[r]);
    } else {
      $('#Detailid').html(lNimed[r]);
    }
  });
}

function alusta() {
  genereeriKuupaevad();
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(laeAndmedTeeDiagramm);
}
