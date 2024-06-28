const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

// Una mejor alternativa es utilizar fetch, pero lo deje asi para conservar la base del problema.
/**
 * This function makes a get request to an url and returns te content as json.
 * @param {string} url Url to call
 * @returns {Promise<Object>}  
 */
function callApi(url) {
  return new Promise( (resolve, reject )=> {
    const HttpReq = new XMLHttpRequest();
    HttpReq.onreadystatechange = (e) =>{
      if (HttpReq.readyState == '4' && HttpReq.status === 200) {
        resolve(JSON.parse(HttpReq.responseText));
      }
      else reject(url);
    };
    HttpReq.open('GET', url, false);
    HttpReq.send();
  })
};

async function main() {
  try {
    const characters = await callApi(BASE_URL);
    console.log('Primer Llamado...');

    const firstCharacter = await callApi(`${BASE_URL}${characters.results[0].id}`);
    console.log('Segundo Llamado...');

    const location = await callApi(firstCharacter.origin.url);
    console.log('Tercer Llamado...');

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`PrimerPersonaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${location.dimension}`);
  } catch (e) {
    return console.error(`Error ${e}`);
  }
}

main()