const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (error) {
            reject(`Error parsing JSON response: ${error.message}`);
          }
        } else {
          reject(`HTTP error: ${xhr.status}`);
        }
      }
    };
    xhr.send();
  });
};

const getCharacterData = async () => {
  try {
    console.log('Primer Llamado...');
    const data = await fetchData(A);

    console.log('Segundo Llamado...');
    const characterData = await fetchData(`${A}${data.results[0].id}`);

    console.log('Tercer Llamado...');
    const originData = await fetchData(characterData.origin.url);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${characterData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

getCharacterData();
