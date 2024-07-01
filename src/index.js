const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(`HTTP error! status: ${B.status}`));
        }
      }
    };
    B.open('GET', url, true);
    B.send();
  });
};

fetchData(A)
  .then(response => {
    console.log('Primer Llamado...');
    const data = JSON.parse(response);
    return fetchData(`${A}${data.results[0].id}`).then(characterResponse => ({
      data,
      characterResponse
    }));
  })
  .then(({ data, characterResponse }) => {
    console.log('Segundo Llamado...');
    const character = JSON.parse(characterResponse);
    return fetchData(character.origin.url).then(originResponse => ({
      data,
      character,
      originResponse
    }));
  })
  .then(({ data, character, originResponse }) => {
    console.log('Tercer Llamado...');
    const origin = JSON.parse(originResponse);
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
