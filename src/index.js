const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = (url) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject(`Error ${B.status}`);
        }
      }
    };
    B.open('GET', url, true);
    B.send();
  });
};
X(A)
  .then((data) => {
    console.log('Primer Llamado...');
    return X(`${A}${data.results[0].id}`).then(character => ({data, character}));
  })
  .then(({data, character}) => {
    console.log('Segundo Llamado...');
    return X(character.origin.url).then(origin => ({data, character, origin}));
  })
  .then(({data, character, origin}) => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  })
  .catch((error) => {
    console.error(error);
  });
