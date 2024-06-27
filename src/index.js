/* Primer problema modificacion y correccion de errores */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var A = "https://rickandmortyapi.com/api/character/";

function X(a, b) {
  var B = new XMLHttpRequest(); // Creamos nueva instancia en cada llamada
  B.onreadystatechange = function (e) {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, JSON.parse(B.responseText)); // Parseamos la respuesta JSON
      } else {
        b(a); // Redundancia en el uso del return
      }
    }
  };
  B.open("GET", a, true); // hacemos uso de una solicitud asíncrona
  B.send();
}

X(A, function (c, d) {
  if (c) return console.error("Error primero: " + c);
  console.log("Primer Llamado...");

  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error("Error segundo: " + e);
    console.log("Segundo Llamado...");

    X(f.origin.url, function (g, h) {
      //quitamos el parseo de aqui
      if (g) return console.error("Error tercero: " + g);
      console.log("Tercer Llamado...");

      console.log("Personajes: " + d.info.count);
      console.log("Primer Personaje: " + f.name);
      console.log("Dimensión: " + h.dimension);
    });
  });
});
