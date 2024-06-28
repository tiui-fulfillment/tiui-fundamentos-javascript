const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

//funcion para buscar informacion en la API
const fetchData = (url_api, callback) => {
  const xhttp = new XMLHttpRequest(); //crear una nueva solicitud cada inicia la funcion
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) { //condicionales de texto en vez de enteros
      if (xhttp.status === 200) {
        callback(null, xhttp.responseText);
      }
      else {
        return callback(url_api);
      }
    } // else extra
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
};

//obtener el primer dato
fetchData(API, (error1, data1) => {
  if (error1) {
    return console.error(`Error: ${error1}`);
  }

  console.log('Primer Llamado...');
  const firstResponse = JSON.parse(data1);

  //obtiene el segundo dato
  fetchData(API + firstResponse.results[0].id, (error2, data2) => { //no estaba llamando al dato JSON
    if (error2) {
      return console.error(`Error: ${error2}`);
    }

    console.log('Segundo Llamado...');
    const secondResponse = JSON.parse(data2);

    //obtiene el tercer dato
    fetchData(secondResponse.origin.url, (error3, data3) => {
      if (error3) {
        return console.error(`Error: ${error3}`);
      }

      console.log('Tercer Llamado...');
      const thirdResponse = JSON.parse(data3);

      //imprime la informacion recabada
      console.log(`\nPersonajes: ${firstResponse.info.count}`);
      console.log(`Primer Personaje: ${secondResponse.name}`);
      console.log(`Dimensión: ${thirdResponse.dimension}\n`);
    });
  });
});

