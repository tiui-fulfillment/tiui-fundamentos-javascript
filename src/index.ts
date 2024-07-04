import { ApiResponseI } from "./interfaces/apiResponse";
import { CharacterI } from "./interfaces/character";

const XMLHttpRequestAlias = require("xmlhttprequest").XMLHttpRequest;

const API: string = 'https://rickandmortyapi.com/api/character/';


const fetchData = (url_api: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequestAlias();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          try {
            const response = JSON.parse(xhttp.responseText);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(`Error ${xhttp.status}`));
        }
      }
    };
    xhttp.open('GET', url_api, true);
    xhttp.send();
  });
};

const main = async (): Promise<void> => {
  try {
    console.log('Primer Llamado...');
    const data1: ApiResponseI = await fetchData(API);
    const characterId: number = data1.results[0].id;

    console.log('Segundo Llamado...');
    const data2: CharacterI = await fetchData(`${API}${characterId}`);
    const originUrl: string = data2.origin.url;

    console.log('Tercer Llamado...');
    const data3: any = await fetchData(originUrl);

    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
};

main();