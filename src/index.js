// // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// import { XMLHttpRequest } from "xmlhttprequest";
// var A = 'https://rickandmortyapi.com/api/character/';
// var B = new XMLHttpRequest();

// function X(a, b) {
//   B.onreadystatechange = function (e) {
//     if (B.readyState == '4') {
//       // console.log(B);
//       if (B.status === '200'){
//         // console.log(B.responseText);
//         return b(null, B.responseText);
//       }
        
//       else return b(a);
//     }
//     else return b(a);
//   };
//   B.open('GET', a, false);
//   B.send();
// };

// X(A, function (c, d) {
//   // if (c) return console.error('Error' + ' ' + c); //Aqui estas diciendo que si la url existe retorne un error lo cual no tiene sentido
//   console.log('Primer Llamado...');
//   X(A + d.results[0].id, function (e, f) {
//     if (e) return console.error('Error' + ' ' + e);
//     console.log('Segundo Llamado...');
//     X(JSON.parse(f).origin.url, function (g, h) {
//       if (g) return console.error('Error' + ' ' + g);
//       console.log('Tercer Llamado...');
//       console.log('Personajes:' + ' ' + JSON.parse(d).info.count); 
//       console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
//       console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
//     });
//   });
// });

const url = 'https://rickandmortyapi.com/api/character/';
let personajes = 0
const fetchData = (url) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocurrio un error ' + response.statusText);
      }
      return response.json();
    });
}

fetchData(url)
  .then(data => {
    console.log('Primer Llamado...');
    personajes = data.results.length
    return fetchData(`${url} ${data.results[0].id}`);
  })
  .then(characterData => {
    console.log('Segundo Llamado...');
    return fetchData(characterData.origin.url);
  })
  .then(originData => {
    console.log('Tercer Llamado...');
    console.log(`Personajes : ${personajes}`);
    console.log(`Primer Personaje: ${originData.name}`);
    console.log('Dimensión:', originData.dimension);
  })
  .catch(error => {
    console.error('Ocurrio un error:', error);
  });

