const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const api = "https://rickandmortyapi.com/api/character/";

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Error: ${xhr.statusText}`));
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  });
};

const getCharacter = async (url) => {
  try {
    const data = await fetchData(url);
    console.log("Primer Llamado...");

    const character = await fetchData(`${url}${data.results[0].id}`);
    console.log("Segundo Llamado...");

    const origin = await fetchData(character.origin.url);
    console.log("Tercer Llamado...");

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(error);
  }
};

getCharacter(api);

/////////// <<<<<   Usando Axios  >>>>>> //////////

const axios = require("axios");

const getCharacterRyM = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log("Primer Llamado...");

    const characterResponse = await axios.get(`${url}${data.results[0].id}`);
    const character = characterResponse.data;
    console.log("Segundo Llamado...");

    const originResponse = await axios.get(character.origin.url);
    const origin = originResponse.data;
    console.log("Tercer Llamado...");

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(error);
  }
};

getCharacterRyM(api)