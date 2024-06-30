const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = "https://rickandmortyapi.com/api/character/";
const B = new XMLHttpRequest();

const X = (url) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject({ status: B.status, statusText: B.statusText });
        }
      }
    };

    B.open("GET", url); // Asíncrono
    B.send();
  });
};

X(A)
  .then((responseA) => {
    console.log("Primer Llamado...");
    const characterId = responseA.results[0].id;
    console.log(`Personajes: ${responseA.info.count}`);
    return X(`${A}${characterId}`);
  })
  .then((responseB) => {
    console.log("Segundo Llamado...");
    const originUrl = responseB.origin.url;
    console.log(`Primer Personaje: ${responseB.name}`);
    return X(originUrl);
  })
  .then((responseC) => {
    console.log("Tercer Llamado...");
    console.log(`Dimensión: ${responseC.dimension}`);
  })
  .catch((error) => {
    console.error("Error en la solicitud:", error);
  });

