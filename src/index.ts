import { XMLHttpRequest } from "xmlhttprequest";

const A = 'https://rickandmortyapi.com/api/character/';

interface Character {
  id: number;
  name: string;
  origin: { url: string };
}

interface CharacterInfo {
  count: number;
}

interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}

interface DimensionResponse {
  dimension: string;
}

const fetchData = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(`Error parsing JSON: ${error}`);
          }
        } else {
          reject(`HTTP error! status: ${xhr.status}`);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

const main = async () => {
  try {
    console.log('Primer Llamado...');
    const data1: CharacterResponse = await fetchData(A);
    const firstCharacterId = data1.results[0].id;

    console.log('Segundo Llamado...');
    const data2: Character = await fetchData(`${A}${firstCharacterId}`);
    const originUrl = data2.origin.url;

    console.log('Tercer Llamado...');
    const data3: DimensionResponse = await fetchData(originUrl);

    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
