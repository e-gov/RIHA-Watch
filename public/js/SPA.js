function alusta() {
  $('#SysteemideArv').click(() => {
    var u = 'https://apidemojatest.herokuapp.com/systeeme';
    /*
      Fetch annab esimeses .then klauslis ainult response objekti. See ei sisalda veel andmeid. Andmete lugemiseks kasutame json() meetodit, see on asünkroonne. Kahe .then-klausli aheldamine.
      Vt https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
    */
    fetch(u)
      .then(function (response) {
        return response.json();
      })
      .then((minuJSON) => {  
        console.log('Andmed saadud');
        $('#Tulemus1').html('<p>RIHAs on kirjeldatud ' +
        '<span class="Loendur">'  
        +  minuJSON.totalElements + '</span>' + ' süsteemi<br><br>' + '<i class="ikoon material-icons ok">done</i>' + '</p>');
      })
      .catch(function (error) {
        console.log('Andmete saamine ebaõnnestus');
      });
    });
  $('#Riigiteenused').click(() => {
    var u = 'https://apidemojatest.herokuapp.com/avalikud';
    fetch(u)
      .then(function (response) {
        return response.json();
      })
      .then((minuJSON) => {  
        console.log('Andmed saadud');
        $('#Tulemus2').html('<p>riigiteenused.ee-s on kirjeldatud ' +
        '<span class="Loendur">'  
        +  minuJSON.services.length + '</span>' + ' avalikku teenust<br><br>' + '<i class="ikoon material-icons ok">done</i>' + '</p>');
      })
      .catch(function (error) {
        console.log('Andmete saamine ebaõnnestus');
      });
});
}
