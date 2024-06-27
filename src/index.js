const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error(`Error ${url_api}`));
      }
    };
    xhttp.open('GET', url_api, true);
    xhttp.send();
  });
};

const getCharacterInfo = async () => {
  try {
    console.log('Primer Llamado...');
    const characters = await fetchData(API);
    console.log('Segundo Llamado...');
    const character = await fetchData(`${API}${characters.results[0].id}`);
    console.log('Tercer Llamado...');
    const origin = await fetchData(character.origin.url);

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (err) {
    console.error(err);
  }
};

getCharacterInfo();
