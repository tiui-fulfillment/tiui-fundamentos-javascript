/*

  ** PARTE 1 **

  Errores:

  1. La petición se estaba haciendo de forma síncrona -> se cambió la línea B.open('GET', a, true);
  2. La instancia de XMLHttpRequest se estaba creando por fuera de la función, generando error porque se estaba reutilizando -> se movió la línea var B = new XMLHttpRequest(); para crear la instancia dentro de la función para que cree una nueva cada que se llame la función
  3. Se estaba pasando como parámetro B.responseText como cadena de texto, no como objeto -> se añadió la línea var data = JSON.parse(B.responseText)
*/

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';

function X(a, b) {
  var B = new XMLHttpRequest(); // Resolución error 2
  B.onreadystatechange = function () {
    if (B.readyState === 4) {
      if (B.status === 200) {
        try {
          var data = JSON.parse(B.responseText); // Resolución error 3
          b(null, data);
        } catch (e) {
          b(`Error parsing response from ${a}: ${e.message}`);
        }
      } else {
        b(`HTTP error ${B.status} on ${a}`);
      }
    }
  };
  B.open('GET', a, true); // Resolución error 1
  B.send();
}

// Llamadas encadenadas
X(A, function (c, d) {
  if (c) return console.error('Error:', c);
  console.log('Primer Llamado...');

  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error('Error:', e);
    console.log('Segundo Llamado...');

    var originUrl = f.origin.url;

    X(originUrl, function (g, h) {
      if (g) return console.error('Error:', g);
      console.log('Tercer Llamado...');

      console.log('Personajes:', d.info.count);
      console.log('Primer Personaje:', f.name);
      console.log('Dimensión:', h.dimension);
    });
  });
});
