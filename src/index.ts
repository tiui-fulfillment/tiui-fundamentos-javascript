import { XMLHttpRequest } from "xmlhttprequest";

const apiUrl: string = 'https://rickandmortyapi.com/api/character/';
const xmlHttpsRequest: XMLHttpRequest = new XMLHttpRequest();

const fetchData = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    xmlHttpsRequest.onreadystatechange = () => {
      if (xmlHttpsRequest.readyState === 4) {
        if (xmlHttpsRequest.status === 200) {
          resolve(JSON.parse(xmlHttpsRequest.responseText));
        } else {
          reject(`Error ${xmlHttpsRequest.status}`);
        }
      }
    };
    xmlHttpsRequest.open('GET', url, false);
    xmlHttpsRequest.send();
  });
};

const fetchCharacterData = async (): Promise<void> => {
  try {
    console.log('Primer Llamado...');
    const firstResponse: any = await fetchData(apiUrl);
    const firstCharacterId: number = firstResponse.results[0].id;

    console.log('Segundo Llamado...');
    const characterResponse = await fetchData(`${apiUrl}${firstCharacterId}`);
    const originUrl: string = characterResponse.origin.url;

    console.log('Tercer Llamado...');
    const originResponse: any = await fetchData(originUrl);
    const residentsLength: number = originResponse.residents.length;
    const firstResidentUrl: string = originResponse.residents[0];

    console.log(`Personajes: ${residentsLength}`);
    console.log(`Dimensión: ${originResponse.dimension}`);

    const characterInfo: any = await fetchData(firstResidentUrl);
    console.log(`Nombre del primer personaje: ${characterInfo.name}`);
  } catch (error: string | any) {
    console.error('Error:', error);
  }
};

fetchCharacterData();
