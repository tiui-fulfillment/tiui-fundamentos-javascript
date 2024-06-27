var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = "https://rickandmortyapi.com/api/character/";
var B = new XMLHttpRequest();

const request = (url) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(B.status));
        }
      }
    };
    B.open("GET", url, false);
    B.send();
  });
};

const fetchCharacter = async () => {
  try {
    console.log("Primer Llamado...");
    const data = await request(A);
    const { results, info } = JSON.parse(data);
    console.log(`Personajes: ${info.count}`);

    console.log("Segundo Llamado...");
    const characterData = await request(`${A}${results[0].id}`);
    const character = JSON.parse(characterData);

    console.log("Tercer Llamado...");
    const originData = await request(character.origin.url);
    const { dimension } = JSON.parse(originData);

    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${dimension}`);

  } catch (error) {
    console.error(`Error ${error.message}`);
  }  
};

fetchCharacter();
