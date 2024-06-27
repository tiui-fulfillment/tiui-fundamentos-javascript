import { XMLHttpRequest } from "xmlhttprequest";

const A = 'https://rickandmortyapi.com/api/character/';

const X = (a) => {
  return new Promise((resolve, reject) => {
  const B = new XMLHttpRequest(); 
    B.onreadystatechange = (e) => {
      if (B.readyState == '4') {
        if (B.status === 200) {
          try {
            const parsedResponse = JSON.parse(B.responseText)
            resolve(parsedResponse)
          } catch (error) {
            reject(new Error('Error parsing response'))
          }
        } else {
          reject(new Error(`HTTP error ${B.status}`));
        }
      }
    };

    B.onerror = () => {
      reject(new Error("Network error"));
    };
    B.open('GET', a, true);
    B.send();
  })
};

X(A)
  .then(d => {
    console.log('Primer Llamado...');
    return X(`${A}${d.results[0].id}`).then(f => ({ d, f }));
  })
  .then(({ d, f }) => {
    console.log('Segundo Llamado...');
    return X(f.origin.url).then(g => ({ d, f, g }));
  })
  .then(({ d, f, g }) => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${g.dimension}`);
  })
  .catch(c => console.error(c));