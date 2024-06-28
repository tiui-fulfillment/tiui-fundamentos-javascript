import { callback } from "./types";
/**
* Request functions that fetch the required data.
* @param  {string} url - url required to fetch the data.
* @param  {callback} callback - function that handle the HTTP response. 
* @return {Promise<any>}
*/
export const fetchRequest = async (url: string, callback: callback): Promise<any> => {
  const httpMethod = 'GET';
  try {
    const response: Response = await fetch(url, { method: httpMethod });
    if (response.ok) {
      const data = await response.text();
      callback(null, data);
    } else {
      callback(null, url);
    }
  } catch (e) {
    console.error(e);
  }
};

