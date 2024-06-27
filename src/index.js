var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();



//Entiendo que el objetivo del problema es consumir la API de rick and morty y obtener datos especificos de ella. Para esto usaremos fetch y la sintaxis ES6


//Funcion que recibe una url y consume los datos de la API y los lleva texto. En este caso, esta seria la funcion que sustituye a X en la version original.

const fetchData = (url) =>{
  return fetch(url)
  .then(response => {
    if(response.ok){
      return response.json()
    }else{
      throw new Error("Algun error al momento de obtener los datos")
    }
  })
}

//Para evitar el promise hell y no anidar tantos .then, usare async await.
const fetchCharacters = async () =>{
  try{
    const responseAll = await fetchData(A) //Obtenemos la data de todos los personajes.
    console.log("Primer llamado") //No es hasta que se cumpla la promesa de arriba que imprimimos que se completo el primer llamado.
    const firstCharacterURL = responseAll.results[0].url //Creamos la URL que apunta a los datos del primer personaje

    //Los siguientes fetch son analogos a lo anterior, siguiendo la  misma estructura.
    const responseFirstCharacter = await fetchData(firstCharacterURL)
    console.log("Segundo llamado")
    const name = responseFirstCharacter.name //Extraemos el nombre del personaje.
    const originURL= responseFirstCharacter.origin.url

    const responseOrigin = await fetchData(originURL)
    console.log("Tercer llamado")
    const dimensionCharacter = responseOrigin.dimension

    //Imprimimos los resultados finales
    console.log(`Personajes: ${responseAll.info.count}`)
    console.log(`Primer personaje: ${name}`)
    console.log(`Dimension: ${dimensionCharacter}`)
  }catch(error){
    console.error(`Error: ${error}`)
  }
}

// Llamar a la función principal
fetchCharacters();

/**
 * 
 * function X(a, b) {
  B.onreadystatechange = function () {
    if (B.readyState == 4) {
      if (B.status === 200){
        b(null, B.responseText);
      }else {
        b('Error en la solicitud');
      }
    }
  };
  B.open('GET', a, true);
  B.send();
};


X(A, function (c, d) {
  if (c) return console.error('Error' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error('Error' + ' ' + e);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + JSON.parse(d).info.count);
      console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
      console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
    });
  });
});
 */


