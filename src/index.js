const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const X = (a) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange =  (e) => {
      (B.readyState == 4 && B.status === 200) ?
          resolve(B.responseText)
          : 
          reject("Error");
    };
    B.open('GET', a, false);
    B.send();
  })
};

X(A).then((d) => {
  console.log(`Primer Llamado...\n`, `Personajes:  ${JSON.parse(d).info.count}`);
  return X(A);
})
.then((f) => {
  console.log(`Segundo Llamado...\n`, `Primer Personaje: ${JSON.parse(f).results[0].name}`);
  return X(A);
})
.then((h) => {
  console.log(`Tercer Llamado...\n`, `Dimensión: ${JSON.parse(h).results[0].origin.name}`);
})
.catch((e) => console.log(`Error ${e}`));
