const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

const fetchCharacterData = async (url) => {
  try {
    const responseText = await makeRequest(url);
    return JSON.parse(responseText);
  } catch (error) {
    throw new Error(`Error al obtener datos: ${error}`);
  }
};

const fetchData = async () => {
  try {
    const responseTextA = await fetchCharacterData(A);
    console.log('Primer Llamado...');
    const firstCharacterUrl = `${A}${responseTextA.results[0].id}`;
    
    const responseTextB = await fetchCharacterData(firstCharacterUrl);
    console.log('Segundo Llamado...');
    const originUrl = responseTextB.origin.url;
    
    const responseTextC = await fetchCharacterData(originUrl);
    console.log('Tercer Llamado...');
    
    console.log(`Personajes: ${responseTextA.info.count}`);
    console.log(`Primer Personaje: ${responseTextB.name}`);
    console.log(`Dimensión: ${responseTextC.dimension}`);
  } catch (error) {
    console.error(`Error en las llamadas: ${error.message}`);
  }
};

fetchData();
