import { fetchRequest } from "./httpRequest";
let API = 'https://rickandmortyapi.com/api/character/';

/**
* Request functions that fetch the required data.
* 
* @return {Promise<any>}
*/
export const firstRequest = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetchRequest(API, (error, data) => {
      if (error) {
        reject(`Error ${error}`);
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}

/**
* Request functions that fetch the required data.
* @param  {number} id - number of id required to fetch the requested character.
* @return {Promise<any>}
*/
export const secondRequest = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetchRequest(API + id, (error, data) => {
      if (error) {
        reject(`Error ${error}`);
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}

/**
* Request functions that fetch the required data.
* @param  {string} url - url required to fetch the data.
* @return {Promise<any>}
*/
export const thirdRequest = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetchRequest(url, (error, data) => {
      if (error) {
        reject(`Error ${error}`);
      } else {
        resolve(JSON.parse(data));
      }
    })
  })
}
