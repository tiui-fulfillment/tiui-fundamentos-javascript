const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const Api = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText); 
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`)); 
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};


const fetchDataAsync = async () => {
  try {
    console.log('Primer Llamado...');
    const data = await fetchData(Api);
    const parsedData = JSON.parse(data);
    
    console.log('Segundo Llamado...');
    const characterData = await fetchData(`${Api}${parsedData.results[0].id}`);
    const parsedCharacter = JSON.parse(characterData);
    
    console.log('Tercer Llamado...');
    const originData = await fetchData(parsedCharacter.origin.url);
    const parsedOrigin = JSON.parse(originData);

    console.log(`Personajes: ${parsedData.info.count}`);
    console.log(`Primer Personaje: ${parsedCharacter.name}`);
    console.log(`Dimensión: ${parsedOrigin.dimension}`);
  } catch (error) {
    console.error('Error:', error.message); 
  }
};

fetchDataAsync();