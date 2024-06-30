var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B;

function X(a, b) {
  B = new XMLHttpRequest();
  B.onreadystatechange = function (e) {
    if (B.readyState === 4) {
      if (B.status === 200){
        b(null, B.responseText);
      }
      else {
        return b(a);
      }
    }
  };
  B.open('GET', a, true);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error' + c.message);
  console.log('Primer Llamado...');
  var data = JSON.parse(d);
  X(A + data.results[0].id, function (e, f) {
    if (e) return console.error('Error' + e.message);
    console.log('Segundo Llamado...');
    var character = JSON.parse(f);
    X(character.origin.url, function (g, h) {
      if (g) return console.error('Error' + g.message);
      console.log('Tercer Llamado...');
      var origin = JSON.parse(h);
      console.log('Personajes:' + data.info.count);
      console.log('Primer Personaje: ' + character.name);
      console.log('Dimensión: ' + origin.dimension);
    });
  });
});