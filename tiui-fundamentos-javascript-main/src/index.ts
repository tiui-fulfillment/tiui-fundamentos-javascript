import { APIResponse, Character, Origin } from "./models";

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

// Función para realizar solicitudes HTTP utilizando fetch y promesas
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: T = await response.json();
  return data;
};

// Función principal asíncrona para ejecutar la lógica del programa
const execute = async () => {
  try {
    // Primera llamada: obtener la lista de personajes
    const apiResponse = await fetchData<APIResponse>(BASE_URL);
    console.log('Primer Llamado...');

    // Segunda llamada: obtener los detalles del primer personaje
    const characterUrl = `${BASE_URL}${apiResponse.results[0].id}`;
    const character = await fetchData<Character>(characterUrl);
    console.log('Segundo Llamado...');

    // Tercera llamada: obtener los detalles del origen del primer personaje
    const origin = await fetchData<Origin>(character.origin.url);
    console.log('Tercer Llamado...');

    // Mostrar resultados en la consola
    console.log(`Número de Personajes: ${apiResponse.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión del Origen: ${origin.dimension}`);
  } catch (error) {
    console.error(`Error al ejecutar las solicitudes: ${(error as Error).message}`);
  }
};

// Ejecutar la función principal
execute();




