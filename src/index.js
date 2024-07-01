// modificaciones para prueba tecnica de JS,
// Realizado por: Omar Andres Juarez Flores (aspirante a vacante de Desarrollador web)
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error fetching data from ${url}`));
        }
      }
    };
    xhr.open('GET', url, false);
    xhr.send();
  });
};

const getCharacterInfo = async () => {
  try {
    console.log('Primer Llamado...');
    const data = await fetchData(A);
    const response = JSON.parse(data);
    console.log(`Personajes: ${response.info.count}`);

    console.log('Segundo Llamado...');
    const characterData = await fetchData(`${A}${response.results[0].id}`);
    const character = JSON.parse(characterData);

    console.log('Tercer Llamado...');
    const originData = await fetchData(character.origin.url);
    const origin = JSON.parse(originData);

    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(error);
  }
};

getCharacterInfo();
