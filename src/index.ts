import { Location, Result, RickAndMorty } from "./models/rick-and-morty";
import { fetchData } from "./utils/fetchData";

const API = 'https://rickandmortyapi.com/api/character/';

const main = async () => {
  try {
    
    console.log('Primer Llamado...');
    const rickAndMorty = await fetchData<RickAndMorty>(API);

    console.log('Segundo Llamado...');
    const result = await fetchData<Result>(API + rickAndMorty.results?.[0].id);

    console.log('Tercer Llamado...');
    const location = await fetchData<Location>(result.origin?.url!);

    console.log(`Personajes: ${rickAndMorty.info?.count}`);
    console.log(`Primer Personaje: ${result.name}`);
    console.log(`Dimensión: ${location.dimension}`);

  } catch (error) {
    console.error(`Error ${error}`);
  }
}

main(); // Call main function 
