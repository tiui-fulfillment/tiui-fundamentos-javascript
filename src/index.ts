import { XMLHttpRequest } from "xmlhttprequest-ts";

export interface APIResponse {
  info: Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Result {
  id: number;
  name: string;
  type: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
  dimension?: string;
}

const API_ENDPOINT = "https://rickandmortyapi.com/api/character/";

// Función para hacer llamadas HTTP y obtener datos.
const fetchData = <T>(api_url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4) {
        if (xhttp.status === 200) {
          try {
            const parsedResponse = JSON.parse(xhttp.responseText);
            resolve(parsedResponse);
          } catch (error) {
            reject(new Error("Error parsing response"));
          }
        } else {
          reject(new Error(`HTTP error ${xhttp.status}`));
        }
      }
    };

    xhttp.onerror = () => {
      reject(new Error("Network error"));
    };
    xhttp.open("GET", api_url, true);
    xhttp.send();
  });
};

// Función asíncrona para manejar las secuencias de llamadas a la API
async function handleRequests() {
  try {
    const data: APIResponse = await fetchData(API_ENDPOINT);
    console.log("Primer Llamado...");

    const character: Result = await fetchData(
      `${API_ENDPOINT}${data.results[0].id}`
    );
    console.log("Segundo Llamado...");

    const origin: Location = await fetchData(character.origin.url);
    console.log("Tercer Llamado...");
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(error);
  }
}

handleRequests();
