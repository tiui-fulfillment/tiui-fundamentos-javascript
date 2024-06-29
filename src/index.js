const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const urlApi = 'https://rickandmortyapi.com/api/character/';

 async function realizarPeticion(url){
  try{
    const respuesta = await fetch(url);
    if(!respuesta.ok){
      throw new Error(`Error de red: `, respuesta.status);
    }
    const datos= await respuesta.json();
    return datos;
  }catch(err){
    throw err;
  }
}
(async ()=>{
  try{
    const personajes=await realizarPeticion(urlApi);
    const personaje1=personajes.results[0];
    const nombrePersonaje=personaje1.name;
    const dimension=personaje1.origin.url;
    const totalPersonajes=personajes.info.count;
    const dimensionP=await realizarPeticion(dimension);

    console.log(`Total Personajes: ${totalPersonajes}`);
    console.log(`Nombre del personaje: ${nombrePersonaje}`);
    console.log(`Dimension: ${dimensionP.dimension}`);

  }catch(err){
    if(err.message.startsWith('Error de red')){
      console.error('Hubo un error dentro de la conexión de red en la petición')
    }else{
      console.error('Hubo un error en la petición', err);
    }
  }
})();