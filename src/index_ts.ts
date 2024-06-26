const httpRequest = require("xmlhttprequest").XMLHttpRequest;

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

type FetchResult = Character | ApiResponse | CharacterLocation;


const mortAndRickApi = 'https://rickandmortyapi.com/api/character/';
const xmlHttpRequest = new httpRequest();

/* El primer problema basicamente era un error donde no se estaba parseando el JSON correctamente
Se mandaba el xmlHttpRequest.responseText como un string y no como un objeto JSON
tambien el estatus que mandaba xmlHttpRequest.status no era el correcto, era tipo number
pero se esta comparando como texto
*/


/**
 * Función que realiza una petición a una API
 * y retorna una promesa con la respuesta
 * @param urlApi {string}
 * @returns Promise<T>
 *   Retorna una promesa con la respuesta de la API
 * @throws Error
 *  Lanza un error si la petición falla
 *  @example
 *  fetchAllData<Character>('https://rickandmortyapi.com/api/character/1');
 */
const fetchAllData = <T extends FetchResult>(urlApi: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    xmlHttpRequest.onreadystatechange = (_: any) => {
      if (xmlHttpRequest.readyState === 4) {
        if (xmlHttpRequest.status === 200) {
          // Retornamos el valor parseado siempre para no tener que usar JSON.parse siempre que queramos usar el valor
          resolve(JSON.parse(xmlHttpRequest.responseText) as T);
        } else {
          // Podemos lanzar un error mas estructurado o extender el error pero creo que se entiende
          reject(new Error(`${urlApi}`));
        }
      }
    };
    xmlHttpRequest.open('GET', urlApi, true);
    xmlHttpRequest.send();
  });
};

/**
 * Función que realiza las peticiones a la API
 * y muestra en consola la información solicitada
 * @function getResponseApi
 * @param urlAPi
 * @returns Promise<void>
 *   Retorna una promesa vacía
 *   @example
 *   getResponseApi('https://rickandmortyapi.com/api/character/1');
 */
const getResponseApi = async (urlAPi: string): Promise<void> => {
  try {
    const data = await fetchAllData<ApiResponse>(urlAPi);
    console.log("Primer llamado...");
    const characterInfo = await fetchAllData<Character>(data.results[0].url);
    console.log("Segundo llamado...");
    const originInfo = await fetchAllData<CharacterLocation>(characterInfo.origin.url);
    console.log("Tercer llamado...");
    console.log(`Personajes ${data.info.count}`);
    console.log(`Primer Personaje: ${characterInfo.name}`);
    console.log(`Dimensión: ${originInfo.name}`);
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
  }
}

(async () => {
  await getResponseApi(mortAndRickApi);
})();
