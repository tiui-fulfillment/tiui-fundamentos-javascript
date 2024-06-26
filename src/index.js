const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
     // Crear una nueva instancia de XMLHttpRequest para cada solicitud
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        xhttp.status === 200 ? resolve(xhttp.responseText) : reject(new Error(`Error al obtener data de ${url_api}`));
      }
    };
    // Abrir la solicitud de forma asíncrona
    xhttp.open('GET', url_api, true);
    xhttp.send();
  });
};

fetchData(API) // Usando Promesas
  .then(data1 => {
    console.log('Primer Llamado...');
    const parsedData1 = JSON.parse(data1);
    return fetchData(`${API}${parsedData1.results[0].id}`).then(data2 => ({ data1: parsedData1, data2 }));
  })
  .then(result => {
    console.log('Segundo Llamado...');
    const parsedData2 = JSON.parse(result.data2);
    return fetchData(parsedData2.origin.url).then(data3 => ({ ...result, data3 }));
  })
  .then(result => {
    console.log('Tercer Llamado...');
    const parsedData3 = JSON.parse(result.data3);
    console.log(`Personajes: ${result.data1.info.count}`);
    console.log(`Primer Personaje: ${JSON.parse(result.data2).name}`);
    console.log(`Dimensión: ${parsedData3.dimension}`);
  })
  .catch(error => console.error(error.message));

// Errores solucionados del código original:
// 1. Crear una nueva instancia de XMLHttpRequest para cada solicitud para evitar el error "INVALID_STATE_ERR: send has already been called".
// 2. Parsear las respuestas JSON antes de acceder a sus propiedades.
// 3. Hacer las solicitudes HTTP de manera asíncrona (tercer parámetro de xhttp.open debe ser true).
