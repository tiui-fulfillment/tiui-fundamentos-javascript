// Importamos el módulo 'xmlhttprequest' para usar XMLHttpRequest en Node.js
const { XMLHttpRequest } = require("xmlhttprequest");

// URL base de la API de Rick and Morty
const baseURL = 'https://rickandmortyapi.com/api/character/';

// Función que realiza una solicitud GET y devuelve una Promesa
const getPersonaje = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error en la solicitud: ${xhr.statusText}`));
        }
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
  });
};

// Función principal que ejecuta la lógica de las llamadas a la API
const main = async () => {
  try {
    // Primer llamado a la API para obtener la lista de personajes
    console.log('Primer Llamado...');
    const response = await getPersonaje(baseURL);
    const data = JSON.parse(response);

    // Segundo llamado a la API para obtener detalles del primer personaje
    console.log('Segundo Llamado...');
    const firstCharacterId = data.results[0].id;
    const response2 = await getPersonaje(`${baseURL}${firstCharacterId}`);
    const character = JSON.parse(response2);

    // Tercer llamado a la API para obtener la información de la dimensión del origen del personaje
    console.log('Tercer Llamado...');
    const response3 = await getPersonaje(character.origin.url);
    const origin = JSON.parse(response3);

    // Mostramos la información obtenida usando template strings
    console.log(`Total de personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);

  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

// Ejecutamos la función principal
main();
