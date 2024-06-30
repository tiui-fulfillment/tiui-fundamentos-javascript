import { XMLHttpRequest } from "xmlhttprequest";

const Api = 'https://rickandmortyapi.com/api/character/';

interface Character {
  id: number;
  name: string;
  origin: { url: string };
}

interface Origin {
  dimension: string;
}

interface ApiResponse {
  info: { count: number };
  results: Character[];
}



const fetchData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      }
    };
    xhr.open('GET', url, true,null, null);
    xhr.send(null);
  });
};

const fetchDataAsync = async () => {
  try {
    console.log('Primer Llamado...');
    const data = await fetchData(Api);
    const parsedData: ApiResponse = JSON.parse(data);

    console.log('Segundo Llamado...');
    const characterData = await fetchData(`${Api}${parsedData.results[0].id}`);
    const parsedCharacter: Character = JSON.parse(characterData);

    console.log('Tercer Llamado...');
    const originData = await fetchData(parsedCharacter.origin.url);
    const parsedOrigin: Origin = JSON.parse(originData);

    console.log(`Personajes: ${parsedData.info.count}`);
    console.log(`Primer Personaje: ${parsedCharacter.name}`);
    console.log(`Dimensión: ${parsedOrigin.dimension}`);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
};

fetchDataAsync();