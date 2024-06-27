import { XMLHttpRequest } from 'xmlhttprequest'

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

function X(a, b) {
  B.onreadystatechange = (e) => {
    if (B.readyState == '4') {
      if (B.status == '200') // ok - he == operator does the type conversion of the operands before comparison
        b(null, B.responseText);
      else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};


X(A, (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');
  X(A + JSON.parse(d).results[0].id, (e, f) => { // JSON.parse(d) is an object, so we can access its properties with the dot notation
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(d).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
