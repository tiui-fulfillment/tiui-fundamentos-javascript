/*

  ** PARTE 1 **

  Errores:

  1. La petición se estaba haciendo de forma síncrona -> se cambió la línea B.open('GET', a, true);
  2. La instancia de XMLHttpRequest se estaba creando por fuera de la función, generando error porque se estaba reutilizando -> se movió la línea var B = new XMLHttpRequest(); para crear la instancia dentro de la función para que cree una nueva cada que se llame la función
  3. Se estaba pasando como parámetro B.responseText como cadena de texto, no como objeto -> se añadió la línea var data = JSON.parse(B.responseText)
*/

//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const apiBaseUrl: string = 'https://rickandmortyapi.com/api/character/';

// Función que toma por parámetro una URL y retorna la respuesta de una petición GET
const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} en ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Error al obtener respuesta de ${url}: ${error.message}`);
  }
};

// Función principal asincrónica para manejar las llamadas en secuencia
const main = async () => {
  try {
    console.log('Cargando Información...');

    const charactersResponse = await fetchData(apiBaseUrl); // Obtener personajes

    const totalCharacters: number = charactersResponse.info.count; // Obtener cantidad de personajes

    const firstCharacter = charactersResponse.results[0]; // Obtener primer personaje
    const firstCharacterId: number = firstCharacter.id; // Obtener ID del primer personaje
    const originUrl: string = firstCharacter.origin.url; // URL con origen del primer personaje

    const [firstCharacterInfo, originInfo] = await Promise.all([ // Ejecutar ambas promesas a la vez para esperar menos tiempo
      fetchData(`${apiBaseUrl}${firstCharacterId}`),
      fetchData(originUrl)
    ]);

    // Imprimir información
    console.log(`Personajes: ${totalCharacters}`);
    console.log(`Primer Personaje: ${firstCharacterInfo.name}`);
    console.log(`Dimensión: ${originInfo.dimension}`);

  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

main();
