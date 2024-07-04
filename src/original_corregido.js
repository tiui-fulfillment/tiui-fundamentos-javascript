var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        try {
          var response = JSON.parse(xhttp.responseText);
          callback(null, response);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error('Error ' + xhttp.status), null);
      }
    }
  };
  xhttp.open('GET', url_api, true);
  xhttp.send();
}

fetchData(API, function (error1, data1) {
  if (error1) return console.error('Error ' + error1);
  console.log('Primer Llamado...');
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) return console.error('Error ' + error2);
    console.log('Segundo Llamado...');
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error('Error ' + error3);
      console.log('Tercer Llamado...');
      console.log('Personajes: ' + data1.info.count);
      console.log('Primer Personaje: ' + data2.name);
      console.log('Dimensión: ' + data3.dimension);
    });
  });
});