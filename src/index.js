// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const A = 'https://rickandmortyapi.com/api/character/';
// let B;

// const  X = (a, b) => {
//   B = new XMLHttpRequest();
//   B.onreadystatechange =  (e) => {
//     if (B.readyState == 4) { // Aqui habia un string '4' y es un número int
//       if (B.status === 200) {
//         return b(null, B.responseText);
//       } else {
//         return b(new Error('Error en la peticion' + B.status));
//       }
//     }
//   };
//   B.open('GET', a, true); // Cambie el valor de false a true para hacer una peticion asincrona 
//   B.send();
// }

// X(A, (c, d) => {
//   if (c) return console.error(`Error: ${c}`);
//   console.log('Primer Llamado...');

//   // Agregue sentencias try catch para capturar errores AL HACER json.parse 

//   try {
//     const data = JSON.parse(d);
//     if (!data.results || !data.results[0] || !data.results[0].id) { // Hice validaciones para asegurar que data exista y no este vacia 
//       throw new Error("Error");
//     }

//     X(A + data.results[0].id, (e, f) => {
//       if (e) return console.error(`Error ${e}`);
//       console.log('Segundo Llamado...');

//       try {
//         const character = JSON.parse(f);
//         if (!character.origin || !character.origin.url) {
//           throw new Error('Error');
//         }

//         X(character.origin.url, (err, h) => {
//           if (err) return console.error(`Error ${err}`);
//           console.log('Tercer Llamado...');

//           try {
//             const origin = JSON.parse(h);
//             console.log(`Personajes: ${data.info.count}`);
//             console.log(`Primer personaje: ${character.name}`);
//             console.log(`Dimension: ${origin.dimension}`);
//           } catch (err) {
//             console.error(`Error al parsear los datos -> origin: ${err}`);
//           }
//         });
//       } catch (err) {
//         console.error(`Error al parsear los datos -> character: ${err}`);
//       }
//     });
//   } catch (err) {
//     console.error(`Error al parsear los datos -> data : ${err}`);
//   }
// });

// Version actualizada con promesas


const url = 'https://rickandmortyapi.com/api/character/';
let personajes = 0
let characterName = ""
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
    personajes = data.info.count
    return fetchData(`${url} ${data.results[0].id}`);
  })
  .then(characterData => {
    characterName = characterData.name
    console.log('Segundo Llamado...');
    return fetchData(characterData.origin.url);
  })
  .then(originData => {
    console.log('Tercer Llamado...');
    console.log(`Personajes : ${personajes}`);
    console.log(`Primer Personaje: ${characterName}`);
    console.log('Dimensión:', originData.dimension);
  })
  .catch(error => {
    console.error('Ocurrio un error:', error);
  });

