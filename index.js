'use strict';

const express = require('express');
const qs = require('query-string');
// https://www.npmjs.com/package/query-string 
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

// Esilehe kuvamine
app.get('/', function (req, res) {
  res.render('pages/index');
});

// Autentimispäringu saatmine
app.get('/auth', (req, res) => {
  // Generate a 16 character alpha-numeric token:
  var token = uid(16);
  var u = 'https://tara-test.ria.ee/oidc/authorize?' + qs.stringify({
    redirect_uri: 'https://samategev.herokuapp.com/Callback',
    scope: 'openid',
    state: token,
    response_type: 'code',
    client_id: 'ParmaksonResearch'
  });
  console.log('autentimispäring: ', u);
  res.redirect(u);
});

app.get('/Systeeme', (req, res) => {
  console.log('*** Süsteeme? ***');
  requestModule({
    url: 'https://test.riha.ee/api/v1/systems',
    method: 'GET'
  },
    (error, response, body) => {
      if (error) {
        console.log('Viga: ', error);
      }
      if (response) {
        console.log('Staatus: ', response.statusCode);
        res.status(200)
          .render('pages/salvestatud', body);
      }
  });
});

// Veebiserveri käivitamine
app.listen(app.get('port'), function () {
  console.log('---- Node rakendus töötab ----');
});


