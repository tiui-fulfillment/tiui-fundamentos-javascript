/* Tercer problema: Usando promesas para evitar el Callback Hell */

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const A = "https://rickandmortyapi.com/api/character/";

const X = (a) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject(`HTTP error: ${B.status}`);
        }
      }
    };
    B.open("GET", a, true);
    B.send();
  });
};

let d;

X(A)
  .then((response) => {
    d = response;
    console.log("Primer Llamado...");
    return X(`${A}${d.results[0].id}`);
  })
  .then((f) => {
    console.log("Segundo Llamado...");
    return X(f.origin.url).then((h) => ({ d, f, h }));
  })
  .then(({ d, f, h }) => {
    console.log("Tercer Llamado...");
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${h.dimension}`);
  })
  .catch((error) => console.error(`Error: ${error}`));
