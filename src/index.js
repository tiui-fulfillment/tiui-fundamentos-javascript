const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const baseURL = 'https://rickandmortyapi.com/api/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error: ${xhr.status}`));
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

const fetchCharacterData = async () => {
  try {
    console.log('Primer Llamado...');
    const response = await fetchData(`${baseURL}character/`);
    const data = JSON.parse(response);
    const characterUrl = `${baseURL}character/${data.results[0].id}`;
    console.log(`URL del primer personaje: ${characterUrl}`);

    console.log('Segundo Llamado...');
    const characterResponse = await fetchData(characterUrl);
    const characterData = JSON.parse(characterResponse);
    console.log(`Origen del primer personaje: ${characterData.origin.url}`);

    console.log('Tercer Llamado...');
    const locationResponse = await fetchData(characterData.origin.url);
    const locationData = JSON.parse(locationResponse);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${characterData.name}`);
    console.log(`Dimensión: ${locationData.dimension}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

fetchCharacterData();