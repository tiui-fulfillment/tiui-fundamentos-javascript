import { XMLHttpRequest } from "xmlhttprequest";

const API_ENDPOINT = 'https://rickandmortyapi.com/api/character/';

const fetchData = (a) => {
  return new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = (e) => {
      if (xhttp.readyState == '4') {
        if (xhttp.status === 200) {
          try {
            const parsedResponse = JSON.parse(xhttp.responseText)
            resolve(parsedResponse)
          } catch (error) {
            reject(new Error('Error parsing response'))
          }
        } else {
          reject(new Error(`HTTP error ${xhttp.status}`));
        }
      }
    };

    xhttp.onerror = () => {reject(new Error("Network error"))};
    xhttp.open('GET', a, true);
    xhttp.send();
  })
};

async function handleRequests() {
  try {
    const data = await fetchData(API_ENDPOINT);
    console.log('Primer Llamado...');

    const character = await fetchData(`${API_ENDPOINT}${data.results[0].id}`);
    console.log('Segundo Llamado...');

    const origin = await fetchData(character.origin.url);
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);

  } catch (error) {
    console.error(error);
  }
}

handleRequests();