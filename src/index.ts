/**
 * Codigo TypeScrip
 * 
*/

import { XMLHttpRequest } from "xmlhttprequest";

const API_URL: string = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();  // Crear una nueva instancia de XMLHttpRequest para cada solicitud
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200 ? resolve(xhr.responseText) : reject(new Error(`Error fetching ${url}`));
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

fetchData(API_URL)
  .then(response => {
    console.log('Primer Llamado...');
    const data = JSON.parse(response);
    return fetchData(`${API_URL}${data.results[0].id}`).then(character => ({ data, character }));
  })
  .then(({ data, character }) => {
    console.log('Segundo Llamado...');
    const charData = JSON.parse(character);
    return fetchData(charData.origin.url).then(origin => ({ data, charData, origin }));
  })
  .then(({ data, charData, origin }) => {
    console.log('Tercer Llamado...');
    const originData = JSON.parse(origin);
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${charData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  })
  .catch(error => console.error(error));

 