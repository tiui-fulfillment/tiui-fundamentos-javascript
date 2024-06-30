var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';

const X = (a) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject(new Error(`Request failed with status ${B.status}`));
        }
      }
    };
    B.open('GET', a, true);
    B.send();
  });
};

X(A)
  .then((d) => {
    console.log('Primer Llamado...');
    return X(A + d.results[0].id).then((f) => ({ d, f }));
  })
  .then(({ d, f }) => {
    console.log('Segundo Llamado...');
    return X(f.origin.url).then((h) => ({ d, f, h }));
  })
  .then(({ d, f, h }) => {
    console.log(`Tercer Llamado...`);
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje:  ${f.name}`);
    console.log(`Dimensión: ${h.dimension}`);
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });


/* Codigo corregido
  1.-Se crea una instancia para cada solicitud 
  2.-"readyState" y "status" con "===" y numeros en lugar de cadenas
  3.-La solicitud se realiza de manera asincrona ('B.open('GET', a, true);').
  4.-Se usa "new Error()" con un mensaje de error 
  5.-La respuesta se parsea correctamente usando "JSON.parse()" antes de acceder a sus propiedades.
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';

function X(a, b) {
  var B = new XMLHttpRequest();
  B.onreadystatechange = function () {
    if(B.readyState === 4){
      if(B.status === 200){
        b(null, JSON.parse(B.responseText));
      } else {
        b(new Error(`Request failed with status ${B.status}`));
      }
    }
  };
  B.open('GET',a,true);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error('Error' + ' ' + e);
    console.log('Segundo Llamado...');
    X(f.origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + d.info.count);
      console.log('Primer Personaje:' + ' ' + f.name);
      console.log('Dimensión:' + ' ' + h.dimension);
    });
  });
});*/