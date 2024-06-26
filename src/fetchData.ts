import RequestError from "./RequestError";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

interface FetchDataReturnType<T> {
    err: Error|null,
    data: T|null
}

/**
 * Realiza una solicitud HTTP GET a la URL proporcionada y devuelve una promesa que resuelve con el resultado.
 * 
 * @template T - El tipo de los datos esperados en la respuesta.
 * @param {string} url - La URL a la que se hará la solicitud.
 * @returns {Promise<FetchDataReturnType<T>>} Una promesa que resuelve con un objeto que contiene el error (si lo hay) y los datos.
 * 
 * @example
 * // Ejemplo de uso
 * fetchData<ApiUrlResponse>('https://rickandmortyapi.com/api/character/')
 *   .then(({ err, data }) => {
 *     if (err) {
 *       console.error(err);
 *     } else {
 *       console.log(data);
 *     }
 *   });
 */
export default function fetchData<T>(url: string): Promise<FetchDataReturnType<T>> {
    const xhttp = new XMLHttpRequest();
  
    return new Promise((res, rej) => {
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            try {
              const responseParsed = JSON.parse(xhttp.responseText) as T;
              res({ err: null, data: responseParsed });
            } catch (error) {
              rej({ err: new Error("No se pudo parsear el JSON"), data: null });
            }
          } else {
            rej({ err: new RequestError(xhttp.status), data: null });
          }
        }
      };
  
      xhttp.open('GET', url, true);
      xhttp.send();
    })
  
  };