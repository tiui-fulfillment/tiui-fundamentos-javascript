const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const url_api = 'https://rickandmortyapi.com/api/character/';

const fetch_Data = (url) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(`Error ${B.status}: ${B.statusText}`);
        }
      }
    };
    B.open('GET', url, true);
    B.send();
  });
};

const rickandmortyapi = async () => {
  try {
    console.log('Primer Llamado...');
    const response1 = await fetch_Data(url_api);
    const data = JSON.parse(response1);

    console.log('Segundo Llamado...');
    const response2 = await fetch_Data(`${url_api}${data.results[0].id}`);
    const characterData = JSON.parse(response2);

    console.log('Tercer Llamado...');
    const response3 = await fetch_Data(characterData.origin.url);
    const originData = JSON.parse(response3);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${characterData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

rickandmortyapi();
