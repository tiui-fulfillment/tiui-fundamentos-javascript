const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(url);
        }
      }
    };
    xhr.send();
  });
};

fetchData(API)
  .then(data => {
    console.log('Primer Llamado...');
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(character => {
    console.log('Segundo Llamado...');
    return fetchData(character.origin.url).then(origin => {
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${character.name}`);
      console.log(`Primer Personaje: ${character.name}`);
      console.log(`Dimensión: ${origin.dimension}`);
    });
  })
  .catch(error => console.error(`Error: ${error}`));
