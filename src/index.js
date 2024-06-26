const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest;

const X = (a) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState == "4") {
        if (B.status === 200) resolve(B.responseText);
      }
      reject(a);
    };
    B.open("GET", a, false);
    B.send();
  });
};

X(A)
  .then((b) => {
    console.log("Primer Llamado...");
    return X(A + JSON.parse(b).results[0].id).then((c) => ({ b, c }));
  })
  .then(({ b, c }) => {
    console.log("Segundo LLamado...");
    return X(JSON.parse(c).origin.url).then((d) => ({ b, c, d }));
  })
  .then(({ b, c, d }) => {
    console.log("Tercer Llamado...");
    console.log(`Personajes: ${JSON.parse(b).info.count}`);
    console.log(`Primer Personaje: ${JSON.parse(c).name}`);
    console.log(`Dimensión: ${JSON.parse(d).dimension}`);
  })
  .catch((error) => console.log(`Error: ${error}`));
