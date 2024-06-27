const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(xhttp.responseText);
        else
          reject(url_api);
      }
      else
        reject(url_api);
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
};

let data1, data2; // Variables para almacenar los datos recibidos en los primeros dos llamados

fetchData(API)
  .then(response => {
    data1 = JSON.parse(response);
    console.log('Primer Llamado...');
    return fetchData(`${API}${data1.results[0].id}`);
  })
  .then(response => {
    data2 = JSON.parse(response);
    console.log('Segundo Llamado...');
    return fetchData(data2.origin.url);
  })
  .then(response => {
    const data3 = JSON.parse(response);
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(error => console.error(`Error ${error}`));

/*
  Problema 1, importación correcta de XMLHttpRequest.
  Problema 2, se implementó la estructura indicada.
  Problema 3, Se reescribió la función fetchData utilizando promesas en lugar de callbacks, evitando el Callback Hell.
  Problema 4, mejora en la estructura y funcionamiento del codigo y corrección en el acceso a las propiedades de los datos parseados en cada paso.
*/

//Nota, trate de pasarlo a TypeScript pero como realmente no tengo experiencia con ese lenguaje tuve algunas complicaciones pero desde ya comenzaré
// a familiarizarme con su funcionamiento. 
