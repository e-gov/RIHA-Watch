fs = require('fs')
fs.readFile('json.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log('fail loetud');
  var json = JSON.parse(data);
  var s = tabuleeriAndmed(json.content);
  console.log(s);
});

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
