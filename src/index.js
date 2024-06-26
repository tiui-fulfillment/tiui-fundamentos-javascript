var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Definimos la URL base de la API
const API_URL = 'https://rickandmortyapi.com/api/character/';

// Function para hacer una solicitud HTTP y devolver una promise
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`Error fetching data from ${url}`)
        }
      }
    };
    xhr.open('GET', url, false);
    xhr.send();
  });
};

// Función asincrónica para obtener y procesar los datos de los personajes
const fetchCharacterData = async () => {
  try {
    console.log('Primer Llamado...')
    // Obtener la lista de personajes
    const charactersResponse = await fetchData(API_URL);
    const characters = JSON.parse(charactersResponse);

    console.log('Segundo Llamado...');
    // Obtener los detalles del primer personaje
    const firstCharacterId = characters.results[0].id;
    const characterResponse = await fetchData(`${API_URL}${firstCharacterId}`)
    const character = JSON.parse(characterResponse);

    console.log('Tercer Llamado...');
    // Obtener los detalles del origen del primer personaje
    const originUrl = character.origin.url;
    const originResponse = await fetchData(originUrl);
    const origin = JSON.parse(originResponse);

    // Imprimir la información obtenida
    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimension: ${origin.dimension}`);
  } catch (error) {
    console.log(error);
  }
};

// Llamamos a la function para obtener y procesar la data
fetchCharacterData();

/*--------> Old code

function X(a, b) {
  B.onreadystatechange = function (e) {
    if (B.readyState == '4') {
      if (B.status === '200')
        b(null, B.responseText);
      else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error('Error' + ' ' + e);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + JSON.parse(d).info.count);
      console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
      console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
    });
  });
});

*/
