const axios = require('axios'); // Importa la biblioteca axios para realizar solicitudes HTTP

const url = 'https://rickandmortyapi.com/api/character/'; // URL base de la API de Rick and Morty
let firstCharacter = ''; // Variable para almacenar el nombre del primer personaje

// Función asíncrona que realiza las llamadas a la API y maneja los datos
const Datos = async () => {
  try {
    console.log('Primer Llamado...');
    const response1 = await axios.get(url); // Primera solicitud a la API para obtener una lista de personajes
    const characterId = response1.data.results[0].id; // Obtiene el ID del primer personaje en la lista

    console.log('Segundo Llamado...');
    const response2 = await axios.get(`${url}${characterId}`); // Segunda solicitud para obtener detalles del primer personaje
    firstCharacter = response2.data.name; // Almacena el nombre del primer personaje
    const originUrl = response2.data.origin.url; // Obtiene la URL de origen del primer personaje

    console.log('Tercer Llamado...');
    const response3 = await axios.get(originUrl); // Tercera solicitud para obtener detalles del origen del personaje
    console.log(`Primer Personaje: ${firstCharacter}`); // Imprime el nombre del primer personaje
    console.log(`Dimensión: ${response3.data.dimension}`); // Imprime la dimensión del origen del primer personaje

    const response4 = await axios.get(url); // Realiza otra solicitud para obtener el número total de personajes
    console.log(`Personajes: ${response4.data.info.count}`); // Imprime el número total de personajes

  } catch (error) {
    console.error(`Error: ${error.message}`); // Maneja y muestra cualquier error que ocurra durante las solicitudes
  }
}

Datos(); // Llama a la función Datos para ejecutar el flujo de trabajo
