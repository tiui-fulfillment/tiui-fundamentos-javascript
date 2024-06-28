const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const X = (a) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error ${xhr.statusText}`));
        }
      }
    };
    xhr.open('GET', a, true);
    xhr.send();
  });
};

X(A)
  .then(response => {
    console.log('Primer Llamado...');
    const firstResponse = JSON.parse(response);
    return X(`${A}${firstResponse.results[0].id}`);
  })
  .then(response => {
    console.log('Segundo Llamado...');
    const secondResponse = JSON.parse(response);
    return X(secondResponse.origin.url).then(originResponse => {
      return { secondResponse, originResponse };
    });
  })
  .then(({ secondResponse, originResponse }) => {
    console.log('Tercer Llamado...');
    const thirdResponse = JSON.parse(originResponse);
    console.log(`Personajes: ${secondResponse.info.count}`);
    console.log(`Primer Personaje: ${secondResponse.name}`);
    console.log(`Dimensión: ${thirdResponse.dimension}`);
  })
  .catch(error => {
    console.error(error);
  });