/*

  ** PARTE 1 **

  Errores:

  1. La petición se estaba haciendo de forma síncrona -> se cambió la línea B.open('GET', a, true);
  2. La instancia de XMLHttpRequest se estaba creando por fuera de la función, generando error porque se estaba reutilizando -> se movió la línea var B = new XMLHttpRequest(); para crear la instancia dentro de la función para que cree una nueva cada que se llame la función
  3. Se estaba pasando como parámetro B.responseText como cadena de texto, no como objeto -> se añadió la línea var data = JSON.parse(B.responseText)
*/

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiBaseUrl = 'https://rickandmortyapi.com/api/character/';

// Función que toma por parámetro una URL y retorna la respuesta de una petición GET
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest(); // Corrección error 2
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) { // Si la respuesta es exitosa
          try {
            var data = JSON.parse(xhr.responseText); // Corrección error 3
            resolve(data);
          } catch (e) {
            reject(`Error al obtener respuesta de ${url}: ${e.message}`);
          }
        } else { // Si hay un error en la petición
          reject(`Error HTTP ${xhr.status} en ${url}`);
        }
      }
    };
    xhr.open('GET', url, true); // Corrección error 1
    xhr.send();
  });
};

// Función principal asincrónica para manejar las llamadas en secuencia
const main = async () => {
  try {
    console.log('Cargando Información...');

    const charactersResponse = await fetchData(apiBaseUrl); // Obtener personajes

    const totalCharacters = charactersResponse.info.count; // Obtener cantidad de personajes

    const firstCharacter = charactersResponse.results[0]; // Obtener primer personaje
    const firstCharacterId = firstCharacter.id; // Obtener ID del primer personaje
    const originUrl = firstCharacter.origin.url; // URL con origen del primer personaje

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
