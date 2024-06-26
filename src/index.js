import { XMLHttpRequest } from "xmlhttprequest";

const A = 'https://rickandmortyapi.com/api/character/';

const fetchJSON = async (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) resolve(JSON.parse(request.responseText));
        else reject(new Error(`Solicitud fallida con estado ${request.status}`));
      }
    };
    request.open('GET', url, true);
    request.send();
  });
};

const fetchData = async () => {
  try {
    const d = await fetchJSON(A);
    console.log("Primer Llamado...");
    const f = await fetchJSON(`${A}${d.results[0].id}`);
    console.log("Segundo Llamado...");
    const h = await fetchJSON(f.origin.url);
    console.log("Tercero Llamado...");
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${h.dimension}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

fetchData();