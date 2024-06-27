/* Segundo problema: Código con ECMAScript 6 usando Arrow Functions y Template Strings */

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const A = "https://rickandmortyapi.com/api/character/";

const X = (a, b) => {
  const B = new XMLHttpRequest();
  B.onreadystatechange = (e) => {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, JSON.parse(B.responseText));
      } else {
        b(a);
      }
    }
  };
  B.open("GET", a, true);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error primero: ${c}`);
  console.log("Primer Llamado...");

  X(`${A}${d.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error segundo: ${e}`);
    console.log("Segundo Llamado...");

    X(f.origin.url, (g, h) => {
      if (g) return console.error(`Error tercero: ${g}`);
      console.log("Tercer Llamado...");

      console.log(`Personajes: ${d.info.count}`);
      console.log(`Primer Personaje: ${f.name}`);
      console.log(`Dimensión: ${h.dimension}`);
    });
  });
});
