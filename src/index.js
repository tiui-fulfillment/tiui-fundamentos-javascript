const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const URL = 'https://rickandmortyapi.com/api/character/';
const xhr = new XMLHttpRequest;

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == "4") {
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
    const characters = await fetchData(URL);

    console.log("Segundo Llamado...");
    const firstCharacterId = characters.results[0].id;
    const firstCharacterData = await fetchData(URL.concat(firstCharacterId));

    console.log("Tercer Llamado...");
    const firstCharacterOrigin = await fetchData(firstCharacterData.origin.url);

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${firstCharacterData.name}`);
    console.log(`Dimensión: ${firstCharacterOrigin.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`)
  }
})()

