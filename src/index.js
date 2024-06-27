const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = "https://rickandmortyapi.com/api/character/";
const B = new XMLHttpRequest();

const X = (a) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(`Error: ${a}`);
        }
      }
    };
    B.open("GET", a, false);
    B.send();
  });
};

const main = async () => {
  try {
    console.log("Primer Llamado...");
    const d = await X(A);
    const data = JSON.parse(d);

    console.log("Segundo Llamado...");
    const f = await X(A + data.results[0].id);
    const firstCharacter = JSON.parse(f);

    console.log("Tercer Llamado...");
    const h = await X(firstCharacter.origin.url);
    const dimensionData = JSON.parse(h);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${dimensionData.dimension}`);
  } catch (error) {
    console.error(error);
  }
};

main();
