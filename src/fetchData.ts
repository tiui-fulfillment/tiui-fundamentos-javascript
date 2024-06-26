import RequestError from "./RequestError";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

interface FetchDataReturnType<T> {
    err: Error|null,
    data: T|null
}

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