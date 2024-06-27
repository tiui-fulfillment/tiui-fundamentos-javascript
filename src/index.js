const axios = require('axios');

const url = 'https://rickandmortyapi.com/api/character/';
let firstCharacter = '';

const Datos = async () => {
  try {
    console.log('Primer Llamado...');
    const response1 = await axios.get(url);
    const characterId = response1.data.results[0].id;

    console.log('Segundo Llamado...');
    const response2 = await axios.get(`${url}${characterId}`);
    firstCharacter = response2.data.name; 
    const originUrl = response2.data.origin.url;

    console.log('Tercer Llamado...');
    const response3 = await axios.get(originUrl);
    console.log(`Primer Personaje: ${firstCharacter}`);
    console.log(`Dimensión: ${response3.data.dimension}`);

    const response4 = await axios.get(url);
    console.log(`Personajes: ${response4.data.info.count}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

Datos();