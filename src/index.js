const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const handleApi = new XMLHttpRequest();

const fetchApi = (url, callback) => {
  handleApi.onreadystatechange = function (e) {
    if (handleApi.readyState == 4) {
      if (handleApi.status === 200) {
        var responseData = JSON.parse(handleApi.responseText);
        callback(null, responseData);
      } else {
        callback(url);
      }
    }
  };
  handleApi.open('GET', url, false);
  handleApi.send();
};

fetchApi(apiUrl, (error, data) => {
  if (error) return console.error(`Error ${error}`);
  console.log('Primer Llamado...');
  fetchApi(apiUrl + data.results[0].id, (error2, characterData) => {
    if (error2) return console.error(`Error ${error2}`);
    console.log('Segundo Llamado...');
    fetchApi(characterData.origin.url, (error3, dimensionData) => {
      if (error3) return console.error(`Error ${error3}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${data.info.count}`);
      console.log(`Primer Personaje: ${characterData.name}`);
      console.log(`Dimensión: ${dimensionData?.dimension}`);
    });
  });
});
