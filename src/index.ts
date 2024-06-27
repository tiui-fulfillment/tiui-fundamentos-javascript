import { APIResponse, Character, Origin } from "./types";

const ApiURL = 'https://rickandmortyapi.com/api/character/';

// NOTA: Dado que fetch es más moderno y generalmente preferido lo cambie a fetch
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json() as Promise<T>;
};

// NOTA: Me gusta usar Async y Await en promesas por su legibilidad, asi que asi queda... 💪🏻
const main = async () => {
  try {
    // Primer Llamado...
    const data = await fetchData<APIResponse>(ApiURL);

    // Segundo Llamado...
    const character = await fetchData<Character>(`${ApiURL}${data.results[0].id}`);

    // Tercer Llamado...
    const origin = await fetchData<Origin>(character.origin.url);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
};

main();