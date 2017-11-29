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

/* RIHA API demoleht */
app.get('/', function (req, res) {
  res.render('pages/index');
});

/* RIHA aktiivsusmonitori leht */
app.get('/watch', function (req, res) {
  res.render('pages/watch');
});

/* Arutelude ülevaateleht */
app.get('/arutelu', function (req, res) {
  res.render('pages/arutelu');
});

/* Süsteemide arvu päring RIHA-st (AJAX) */
app.get('/systeeme', (req, res) => {
  requestModule({
    url: 'https://test.riha.ee/api/v1/systems',
    method: 'GET'
  },
    (error, response, body) => {
      if (error) {
        console.log('Viga: ', error);
      }
      if (response) {
        console.log('Päring RIHAsse - staatus: ', response.statusCode);
        res.status(200)
          .send(body);
      }
  });
});

/* Süsteemi arutelude päring RIHA-st (AJAX) */
app.get('/arutelud', (req, res) => {
  var shortname = req.query.s; 
  requestModule({
    url: 'https://test.riha.ee/api/v1/systems/' + shortName + '/issues',
    method: 'GET'
  },
    (error, response, body) => {
      if (error) {
        console.log('Viga: ', error);
      }
      if (response) {
        console.log('/arutelud (Süsteemi arutelude päring RIHA-st) - staatus: ', response.statusCode);
        res.status(200)
          .send(body);
      }
  });
});

/* Süsteemide nimekirja päring RIHA-st (AJAX) */
app.get('/koik', (req, res) => {
  requestModule({
    url: 'https://riha.ee/api/v1/systems?size=2000',
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

/* Avalike teenuste nimekirja päring
 riigiteenuste portaalist (AJAX) */
app.get('/avalikud', (req, res) => {
  console.log('*** Avalikke teenuseid? ***');
  requestModule({
    url: 'https://www.riigiteenused.ee/api/et/all',
    method: 'GET'
  },
    (error, response, body) => {
      if (error) {
        console.log('Viga: ', error);
      }
      if (response) {
        console.log('Päring riigiteenused.ee-sse - staatus: ', response.statusCode);
        res.status(200)
          .send(body);
      }
  });
});

// Veebiserveri käivitamine
app.listen(app.get('port'), function () {
  console.log('---- Node rakendus töötab ----');
});


