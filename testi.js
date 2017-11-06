/* Node.js abil testimiseks

*/

function genereeriKuupaevad(n) {
  /*
    Genereerib massiivi n viimase kuupäevaga (nii Date kui ka kuupäev.kuu vormingus), alates tänasest.
  */
  var kuupaevad = [];
  var tana = new Date();
  for (var i = 0; i < 10; i++) {
    var kp =
      tana.getDate().toString() + '.' +
      (tana.getMonth() + 1).toString();
    kuupaevad.push({
      kp: kp,
      loodud: 0,
      uuendatud: 0
    });
    tana.setDate(tana.getDate() - 1);
  }
  return kuupaevad;
}

var andmetabel = genereeriKuupaevad();

fs = require('fs')
fs.readFile('json.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log('fail loetud');
  var json = JSON.parse(data);
  var s = tabuleeriAndmed(json.content);
  console.log(andmetabel);
});

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
    }
    if (paeviUuendamisest < 10) {
      andmetabel[paeviUuendamisest].uuendatud++;
    }
  });
}
