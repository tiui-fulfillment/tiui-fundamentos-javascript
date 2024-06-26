/*

  ** PARTE 1 **

  Errores:

  1. La petición se estaba haciendo de forma síncrona -> se cambió la línea B.open('GET', a, true);
  2. La instancia de XMLHttpRequest se estaba creando por fuera de la función, generando error porque se estaba reutilizando -> se movió la línea var B = new XMLHttpRequest(); para crear la instancia dentro de la función para que cree una nueva cada que se llame la función
  3. Se estaba pasando como parámetro B.responseText como cadena de texto, no como objeto -> se añadió la línea var data = JSON.parse(B.responseText)
*/

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

// Función que retorna una promesa
const X = (a) => {
  return new Promise((resolve, reject) => {
    var B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          try {
            var data = JSON.parse(B.responseText);
            resolve(data);
          } catch (e) {
            reject(`Error parsing response from ${a}: ${e.message}`);
          }
        } else {
          reject(`HTTP error ${B.status} on ${a}`);
        }
      }
    };
    B.open('GET', a, true);
    B.send();
  });
};

// Llamadas encadenadas usando promesas
X(A)
  .then(d => {
    console.log('Primer Llamado...');
    return X(`${A}${d.results[0].id}`).then(f => {
      return { f, d }; // Retorna ambos resultados
    });
  })
  .then(({ f, d }) => {
    console.log('Segundo Llamado...');
    return X(f.origin.url).then(h => {
      console.log('Tercer Llamado...');

      console.log(`Personajes: ${d.info.count}`);
      console.log(`Primer Personaje: ${f.name}`);
      console.log(`Dimensión: ${h.dimension}`);
    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
