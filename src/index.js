const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const handleApi = new XMLHttpRequest();

const fetchApi = (url) => {
  return new Promise((resolve, reject) => {
    handleApi.onreadystatechange = function () {
      if (handleApi.readyState == 4) {
        if (handleApi.status === 200) {
          var responseData = JSON.parse(handleApi.responseText);
          resolve(responseData);
        } else {
          reject(new Error(`Error fetching ${url}. Status: ${handleApi.status}`));
        }
      }
    };
    handleApi.open('GET', url, false);
    handleApi.send();
  });
};

fetchApi(apiUrl)
  .then((data) => {
    console.log('Primer Llamado...');
    console.log(`Personajes: ${data.info.count}`);
    return fetchApi(apiUrl + data.results[0].id);

  })
  .then((characterData) => {
    console.log('Segundo Llamado...');
    console.log(`Primer Personaje: ${characterData.name}`);
    return fetchApi(characterData.origin.url);
  })
  .then((dimensionData) => {
    console.log('Tercer Llamado...');
    console.log(`Dimensión: ${dimensionData.dimension}`);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
