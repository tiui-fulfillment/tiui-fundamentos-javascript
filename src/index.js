var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';

function X(a, b) {
  var B = new XMLHttpRequest(); // Crear una nueva instancia para cada solicitud
  B.onreadystatechange = function () {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        b(new Error(`HTTP error! status: ${B.status}`));
      }
    }
  };
  B.open('GET', a, true); // Solicitud asincrónica
  B.send();
}

X(A, function (c, d) {
  if (c) return console.error('Error: ' + c.message);
  var data = JSON.parse(d);
  console.log('Primer Llamado...');
  X(A + data.results[0].id, function (e, f) {
    if (e) return console.error('Error: ' + e.message);
    var character = JSON.parse(f);
    console.log('Segundo Llamado...');
    X(character.origin.url, function (g, h) {
      if (g) return console.error('Error: ' + g.message);
      var origin = JSON.parse(h);
      console.log('Tercer Llamado...');
      console.log('Personajes: ' + data.info.count);
      console.log('Primer Personaje: ' + character.name);
      console.log('Dimensión: ' + origin.dimension);
    });
  });
});
