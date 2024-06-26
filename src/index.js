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

fetchData(apiUrl)
  .then(data => {
    console.log('Primer Llamado...');
    const firstCharacterId = data.results[0].id;
    
    return fetchData(apiUrl + firstCharacterId);
  })
  .then(character => {
    console.log('Segundo Llamado...');
    const originUrl = character.origin.url;

    return fetchData(originUrl);
  })
  .then(origin => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${origin.residents.length}`); 
    console.log(`Dimensión: ${origin.dimension}`);

    return fetchData(origin.residents[0]);
  })
  .then(characterInfo => {
    console.log(`Primer Personaje: ${characterInfo.name}`);
  })
  .catch(error => {
    console.error('Error:', error);
  });
