/* 
Instead of using XMLHttpRequest switched to fetch a promise based API providing a better way to make http requests and responses. 
Provides methods .then() and .catch() to handle the response and errors as well as the use of try/catch blocks.
Furthermore, JSON responses are handled with .json() method.
And finally fetch is always asynchronous returning a promise and ensuring operations that do not block the main thread, 
understanding that JavaScript is single-threaded programming language.
*/

type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

type Origin = {
  name: string;
  url: string;
};

type LocationData = {
  name: string;
  url: string;
};

type Result = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: LocationData;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

interface CharacterData {
  info: Info;
  results: Result[];
}

/**
 * Arrow function that fetches data from the Rick and Morty API using Promises and template strings to log the data.
 * Follows ES6 syntax however I would opt for ES8 a more modern approach using async/await.
 */
const getCharacterData = (): void => {
  fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then((data: CharacterData) => {
      console.log('Primer Llamado...');
      console.log(`Personajes: ${data.info.count}`);
      
      return fetch(data.results[0].url);
    })
    .then(response => response.json())
    .then((characterData: Result) => {
      console.log('Segundo Llamado...');
      console.log(`Primer Personaje: ${characterData.name}`);
      
      return fetch(characterData.origin.url)
        .then(response => response.json())
        .then((originData: Origin) => ({
          characterData,
          originData
        }));
    })
    .then(({ characterData, originData }) => {
      console.log('Tercer Llamado...');
      console.log(`Dimensión: ${originData.name}`);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
}

getCharacterData();
