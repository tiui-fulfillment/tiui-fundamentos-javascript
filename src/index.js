var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

/*
======  PRIMER PROBLEMA  ======
*/
console.log("\n-----  Primer problema -----\n")
function X(a, b) {
  B.onreadystatechange = function (e) {
    if (B.readyState == 4) {
      if (B.status === 200){
        b(null, B.responseText);
      }else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error 1' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + JSON.parse(d).results[0].id, function (e, f) {
    if (e) return console.error('Error 2' + ' ' + e);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, function (g, h) {
      if (g) return console.error('Error 3' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + JSON.parse(d).info.count);
      console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
      console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
    });
  });
});

/*
======  SEGUNDO PROBLEMA  ======
*/

console.log("\n-----  Segundo problema -----\n")

function X2(a, b) {
  B.onreadystatechange = (e) => {
    B.readyState == 4 ? B.status === 200 ? b(null, B.responseText) : b(a) : b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X2(A, (c, d) => {
  c ? console.error(`Error 1 ${c}`) : console.log(`Primer Llamado...`);
  X2(A + JSON.parse(d).results[0].id, (e, f) =>{
    e ? console.error(`Error 2 ${e}`) : console.log(`Segundo Llamado...`);
    X2(JSON.parse(f).origin.url, (g, h) =>{
      g ? console.error(`Error 3 ${g}`) : 
      console.log(`Tercer Llamado...`);
      console.log(`Personajes: ${JSON.parse(d).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    })
  })
});


/*
======  TERCER/CUARTO PROBLEMA  ======
*/

console.log("\n-----  Tercer/cuarto problema -----\n")

function X3(a) {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      B.readyState == 4 && B.status === 200 
      ? resolve(B.responseText) 
      : reject(new Error(`Hubo un error al procesar la solicitud: ${B.status}`));
    };
  B.open('GET', a, false);
  B.send();
  })
};

X3(A)
  .then(r => {
    d = JSON.parse(r);
    console.log(`Primer Llamado...`);
    return X3(A + d.results[0].id);
  })
  .then(r => {
    f = JSON.parse(r);
    console.log(`Segundo Llamado...`);
    return X3(f.origin.url);
  })
  .then(r => {
    h = JSON.parse(r);
    console.log(`Tercer Llamado...`);
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${h.dimension}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
