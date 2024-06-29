const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else {
          reject(new Error(`Error ${xhttp.status}`));
        }
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  });
};

fetchData(API)
  .then(data1 => {
    console.log('Primer Llamado...');
    return fetchData(`${API}${data1.results[0].id}`).then(data2 => ({ data1, data2 }));
  })
  .then(({ data1, data2 }) => {
    console.log('Segundo Llamado...');
    return fetchData(data2.origin.url).then(data3 => ({ data1, data2, data3 }));
  })
  .then(({ data1, data2, data3 }) => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(error => console.error(error));
