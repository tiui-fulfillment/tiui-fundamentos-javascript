// Para comenzar, es necesario importar el módulo XMLHttpRequest para realizar solicitudes HTTP
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = "https://rickandmortyapi.com/api/character/";

// Función fetchData que devuelve una promesa para realizar una solicitud HTTP
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    // Creamos una nueva instancia XMLHttpRequest para la solicitud
    const B = new XMLHttpRequest();
    // Se configura la función de callback para manejar los cambios de estado de la solicitud
    B.onreadystatechange = () => {
      // Verifica si la solicitud ha completado (estado 4)
      if (B.readyState === 4) {
        // Si la solicitud es exitosa (estado 200), resuelve la promesa con la respuesta
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          // Si la solicitud falla, rechaza la promesa con un error y el estado de la solicitud
          reject(new Error(`Request failed with status ${B.status}`));
        }
      }
    };

    // Se inicializa la solicitud HTTP con el método GET y la URL proporcionada
    B.open("GET", url, true);
    // Enviamos la solicitud
    B.send();
  });
};

// Función principal que utiliza async/await para coordinar las llamadas a fetchData
const main = async () => {
  try {
    console.log("Primer Llamado...");

    // Primeramente, se realiza la primera solicitud para obtener la lista de personajes
    const response1 = await fetchData(A);
    const data = JSON.parse(response1);

    console.log("Segundo Llamado...");

    // Luego, se realiza la segunda solicitud para obtener los detalles del primer personaje
    const response2 = await fetchData(`${A}${data.results[0].id}`);
    const characterData = JSON.parse(response2);

    console.log("Tercer Llamado...");

    // Finalmente, se realiza la tercera solicitud para obtener los detalles del origen del primer personaje
    const originResponse = await fetchData(characterData.origin.url);
    const originData = JSON.parse(originResponse);

    // Se imprime la cantidad total de personajes, el nombre y la dimensión del primero
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${characterData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  } catch (error) {
    // Se captura y maneja cualquier error que ocurra durante las solicitudes
    console.error(`Error: ${error.message}`);
  }
};

// Se ejecuta la función principal
main();
