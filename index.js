'use strict';

const express = require('express');
const requestModule = require('request');
require('request-debug')(requestModule);

// Veebiserveri ettevalmistamine
// https://expressjs.com/en/4x/api.html#app 
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// root directory from which to serve static assets
// http://expressjs.com/en/starter/static-files.html 
// https://expressjs.com/en/4x/api.html#express.static
app.set('views', __dirname + '/views');
// a directory for application's views
app.set('view engine', 'ejs');

/* RIHA aktiivsusmonitori leht */
app.get('/', function (req, res) {
  res.render('pages/watch');
});

/* Süsteemide nimekirja päring RIHA-st (AJAX) */
app.get('/koik', (req, res) => {
  requestModule({
    url: 'https://riha.ee/api/v1/systems?size=3000',
    method: 'GET'
  },
    (error, response, body) => {
      if (error) {
        console.log('Viga: ', error);
      }
      if (response) {
        console.log('/koik (Süsteemide nimekirja päring RIHA-st) - staatus: ', response.statusCode);
        res.status(200)
          .send(body);
      }
  });
});

// Veebiserveri käivitamine
app.listen(app.get('port'), function () {
  console.log('---- Node rakendus töötab ----');
});


