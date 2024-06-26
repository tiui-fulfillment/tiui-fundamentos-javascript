const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const xmlHttpsRequest = new XMLHttpRequest();

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    xmlHttpsRequest.onreadystatechange = () => {
      if (xmlHttpsRequest.readyState === 4) {
        if (xmlHttpsRequest.status === 200) {
          resolve(JSON.parse(xmlHttpsRequest.responseText));
        } else {
          reject(`Error ${xmlHttpsRequest.status}`);
        }
      }
    };
    xmlHttpsRequest.open('GET', url, false);
    xmlHttpsRequest.send();
  });
};

const fetchCharacterData = async () => {
  try {
    console.log('Primer Llamado...');
    const firstResponse = await fetchData(apiUrl);
    const firstCharacterId = firstResponse.results[0].id;

    console.log('Segundo Llamado...');
    const characterResponse = await fetchData(apiUrl + firstCharacterId);
    const originUrl = characterResponse.origin.url;

    console.log('Tercer Llamado...');
    const originResponse = await fetchData(originUrl);
    const residentsLength = originResponse.residents.length;
    const firstResidentUrl = originResponse.residents[0];

    console.log(`Personajes: ${residentsLength}`);
    console.log(`Dimensión: ${originResponse.dimension}`);

    console.log('Obteniendo nombre del primer personaje...');
    const characterInfo = await fetchData(firstResidentUrl);
    console.log(`Nombre del primer personaje: ${characterInfo.name}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchCharacterData();
