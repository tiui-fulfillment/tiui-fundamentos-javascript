const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Url de la API
const A = 'https://rickandmortyapi.com/api/character/';

//Funcion que espera el URL
const X = (url) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject(new Error(`Error en la solicitud: ${B.status}`));
        }
      }
    };
    B.open('GET', url, true);
    B.send();
  });
};

const fecthRickAndMortyCharacterData= async () =>{
  try {
    //Le pasamos la consulta de la API a la constante d
    //La constante d almacena el campo de info el cual es el encabezado de la API, actualmente registra 826 personajes
    //El campo info esta compuesto por: count, pages, next, prev
    const d = await X(A);
    console.log('Primer Llamado ...');

    //Le asignamos a la constante f los resultados de la primera pagina de la API
    //La primera pagina contiene 20 personajes
    //Hacemos la peticion de la informacion del primer personaje results[0]
    const f = await X(`${A}${d.results[0].id}`);
    console.log('Segundo Llamado...');
    
    //Le pasamos el valor de la tierra de Origen a la constante h
    //origin tiene 2 valores, el name y el url
    //El valor del url pertenece a otra instancia de la API
    //El cual dentro de la API tiene un id de tierra, el nombre, tipo de planeta, la dimension (valor que guardaremos mas adelante) y una lista de los residentes de dicha dimension
    const h = await X(f.origin.url);
    
    console.log('Tercer Llamado...');

    //Imprimimos el valor de cuantos personajes hay registrados en la API
    console.log(`Personajes: ${d.info.count}`);
    //Imprimimos el personaje con el id 1 - el primer personaje guardado en el array de results
    console.log(`Primer Personaje: ${f.name}`);
    //Imprimimos la dimension a la que pertenece el personaje
    console.log(`Dimensión: ${h.dimension}`);
  }
  catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

fecthRickAndMortyCharacterData();