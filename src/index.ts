import { Character, Characters, Location } from "./types";
const XMLHttpRequestModule = require("xmlhttprequest").XMLHttpRequest;

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const xhr = new XMLHttpRequestModule();

const fetchData = <T>(url:string): Promise<T> => {
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200){
          resolve(JSON.parse(xhr.responseText));
        } else{
          reject(url);
        }      
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
};

(async () => { 
  try {
    console.log("Primer Llamado...");
    const characters = await fetchData<Characters>(apiUrl);

    console.log("Segundo Llamado...");
    const firstCharacterId = characters.results[0].id;
    const firstCharacterData = await fetchData<Character>(apiUrl.concat(firstCharacterId.toString()));

    console.log("Tercer Llamado...");
    const firstCharacterOrigin = await fetchData<Location>(firstCharacterData.origin.url);

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${firstCharacterData.name}`);
    console.log(`Dimensión: ${firstCharacterOrigin.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`)
  }
})()

