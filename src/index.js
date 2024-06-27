import { XMLHttpRequest } from 'xmlhttprequest';

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

/*
// Use this function to get the data from an API using fetch

const X = async (a, b) => {
  const r = await fetch(a);
  const d = await r.text();
  b(d);
  return d;
}
*/

// Use this function to get the data from an API using XMLHttpRequest
function X(a, b) {
  return new Promise((c) => {
    B.onreadystatechange = function (e) {
      if (B.readyState == '4') {
        if (B.status == '200')
          b(null, B.responseText);
        else return b(a);
      }
      else return b(a);
    };
    B.open('GET', a, false);
    B.send();

    return c(B.responseText);
  });
}

const R = async () => {
  try {
    const r1 = await X(A, () => {
      console.log('Primer Llamado...');
    });

    const r2 = await X(A + JSON.parse(r1).results[0].id, () => {
      console.log('Segundo Llamado...');
    });

    const r3 = await X(JSON.parse(r2).origin.url, () => {
      console.log('Tercer Llamado...');
    });

    console.log(`Personajes: ${JSON.parse(r1).info.count}`);
    console.log(`Primer Personaje: ${JSON.parse(r2).name}`);
    console.log(`Dimensión: ${JSON.parse(r3).dimension}`);

  } catch (e) {
    console.error(`Error ${e}`);
  }
}

R();