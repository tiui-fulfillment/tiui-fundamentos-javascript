
/*
  Primer problema
  La aplicación tiene errores que no permiten ejecutarla. Lee detenidamente el código y determina dónde se encuentran los errores al ejecutarlo en la consola.
  1. Los errores de la aplicación eran debido a la condición del status. Al usar el tripe '===' no era posible
  realizar la comparación.
  2. En el segundo callback la información se recibió en formato json lo cual requierió el parseo.
  3. En el tercer callback se ejecutaron correctamente todos los logs
*/

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var A = 'https://rickandmortyapi.com/api/character/';
// var B = new XMLHttpRequest();

// function X(a, b) {
//   B.onreadystatechange = function (e) {
//     if (B.readyState == '4') {
//       if (B.status === 200)
//         b(null, B.responseText);
//       else return b(a);
//     }
//     else return b(a);
//   };
//   B.open('GET', a, false);
//   B.send();
// };
// X(A, function (c, d) {
//   if (c) return console.error('Error' + ' ' + c);
//   console.log('Primer Llamado...');
//   const parseData = JSON.parse(d);
//   X(A + parseData.results[0].id, function (e, f) {
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


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Segundo Problema
 * Una vez que tu aplicación ya esté funcionando, convierte el código a ECMAScript 6 (ES6):
 * -Arrow Functions
 * -Template Strings
*/
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var A = 'https://rickandmortyapi.com/api/character/';
// var B = new XMLHttpRequest();

// const X = (a, b) => {
//   B.onreadystatechange = (e) => {
//     if (B.readyState == '4') {
//       if (B.status === 200)
//         b(null, B.responseText);
//       else return b(a);
//     }
//     else return b(a);
//   };
//   B.open('GET', a, false);
//   B.send();
// };

// X(A, (c, d) => {
//   if (c) return console.error(`Error ${c}`);
//   console.log('Primer Llamado...');
//   const parseData = JSON.parse(d);
//   X(`${A} ${parseData.results[0].id}`, (e, f) => {
//     if (e) return console.error(`Error ${e}`);
//     console.log('Segundo Llamado...');
//     X(JSON.parse(f).origin.url, (g, h) => {
//       if (g) return console.error(`Error ${g}`);
//       console.log('Tercer Llamado...');
//       console.log(`Personajes: ${JSON.parse(d).info.count}`);
//       console.log(`Primer Personaje: ${JSON.parse(f).name}`);
//       console.log(`Dimensión: ${JSON.parse(h).dimension}`);
//     });
//   });
// });


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/**
 * Tercer problema y cuarto problema
 * Transforma el código escrito en ECMAScript 6 (ES6) para que funcione con promesas y así evitar el Callback Hell del final.
 * Optimiza el código para mejorar su legibilidad y eficiencia.
 */

const baseUrl = "https://rickandmortyapi.com/api/character/";

const sendRequest = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return response.json();
}

const printResults = async () => {
    try {
        const firstCall = await sendRequest(baseUrl);
        console.log('Primer llamado');

        const secondCall = await sendRequest(`${baseUrl}${firstCall.results[0].id}`);
        console.log('Segundo llamado');

        const thirdCall = await sendRequest(secondCall.origin.url);
        console.log('Tercer llamado');

        console.log('Personajes: ' + firstCall.info.count);
        console.log('Primer Personaje: ' + secondCall.name);
        console.log('Dimensión: ' + thirdCall.dimension);
    } catch (error) {
        console.error('Request failed', error);
    }
}

printResults();


