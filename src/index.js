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

const fetchData = async () => {
  try {
    const data = await fetchApi(apiUrl);
    console.log(`Personajes: ${data.info.count}`);

    const characterData = await fetchApi(apiUrl + data.results[0].id);
    console.log(`Primer Personaje: ${characterData.name}`);

    const dimensionData = await fetchApi(characterData.origin.url);
    console.log(`Dimensión: ${dimensionData.dimension}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

fetchData();
