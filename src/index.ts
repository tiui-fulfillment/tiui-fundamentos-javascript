import { Origin, Result, Rickandmortyapi } from './interfaces/interface';

const API_URL = 'https://rickandmortyapi.com/api/character/';

// Se quito XMLHttpRequest debido a que no es nativo de Node.js y se cambio por fetch
const fetchJSON = async <T> (url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching ${url}: ${error.message}`);
    } else {
      throw new Error(`Unknown error fetching ${url}`);
    }
  }
};

const main = async () => {
  try {
    console.log('Primer Llamado...');
    const response = await fetchJSON<Rickandmortyapi>(API_URL);

    console.log('Segundo Llamado...');
    const character = await fetchJSON<Result>(`${API_URL}${response.results[0].id}`);

    console.log('Tercer Llamado...');
    const origin = await fetchJSON<Origin>(character.origin.url);

    console.log('Personajes:', response.info.count);
    console.log('Primer Personaje:', character.name);
    console.log('Dimensión:', origin.dimension);
  } catch (error) {
    console.error('Error', error);
  }
};

main();