/**
 * Esto se genera al movento de convertirlo a TypeSript
 */
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const xmlhttprequest_1 = require("xmlhttprequest");
const API_URL = 'https://rickandmortyapi.com/api/character/';
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new xmlhttprequest_1.XMLHttpRequest(); // Crear una nueva instancia de XMLHttpRequest para cada solicitud
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                xhr.status === 200 ? resolve(xhr.responseText) : reject(new Error(`Error fetching ${url}`));
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
};
fetchData(API_URL)
    .then(response => {
    console.log('Primer Llamado...');
    const data = JSON.parse(response);
    return fetchData(`${API_URL}${data.results[0].id}`).then(character => ({ data, character }));
})
    .then(({ data, character }) => {
    console.log('Segundo Llamado...');
    const charData = JSON.parse(character);
    return fetchData(charData.origin.url).then(origin => ({ data, charData, origin }));
})
    .then(({ data, charData, origin }) => {
    console.log('Tercer Llamado...');
    const originData = JSON.parse(origin);
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${charData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
})
    .catch(error => console.error(error));


/**
 * Codigo JavaScript
 *
 * 1. Uso incorrecto de readyState: El valor de readyState debe ser comparado con un número, no con una cadena.
 * 2. Errores en la función de callback: El callback de X no maneja correctamente los errores en algunas partes.
 * 3. Configuración incorrecta de la solicitud open: El tercer parámetro de open debería ser true para solicitudes asíncronas.
 * 4. Error de multiples Solicitudes:  este error se debe a que la instancia de XMLHttpRequest está siendo reutilizada en múltiples solicitudes.
 *  Para solucionar esto, necesitamos crear una nueva instancia de XMLHttpRequest en cada llamada a fetchData.
 * 
 


const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API_URL = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();  // Crear una nueva instancia de XMLHttpRequest para cada solicitud
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200 ? resolve(xhr.responseText) : reject(new Error(`Error fetching ${url}`));
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

fetchData(API_URL)
  .then(response => {
    console.log('Primer Llamado...');
    const data = JSON.parse(response);
    return fetchData(`${API_URL}${data.results[0].id}`).then(character => ({ data, character }));
  })
  .then(({ data, character }) => {
    console.log('Segundo Llamado...');
    const charData = JSON.parse(character);
    return fetchData(charData.origin.url).then(origin => ({ data, charData, origin }));
  })
  .then(({ data, charData, origin }) => {
    console.log('Tercer Llamado...');
    const originData = JSON.parse(origin);
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${charData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  })
  .catch(error => console.error(error));

*/


