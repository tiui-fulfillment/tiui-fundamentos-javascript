import { ApiUrlResponse, Character, Location } from "./types";
import fetchData from "./fetchData";

const API_URL = 'https://rickandmortyapi.com/api/character/';

async function main(){
  console.log('Primer llamado...')
  const {err: firstError, data: firstApiResponse} = await fetchData<ApiUrlResponse>(API_URL);
  if(firstError){
    console.error(`Error: ${firstError}`) 
    return
  }

  console.log('Segundo llamado')
  const firstCharacterId = firstApiResponse!.results[0].id
  const {err: secondError, data: characterData} = await fetchData<Character>(`${API_URL}${firstCharacterId}`)
  if(secondError){
    console.error(`Second error: ${secondError}`)
    return
  }
  
  console.log('Tercer llamado...')
  const {err: thirdError, data: locationData} = await fetchData<Location>(characterData!.origin.url)

  if(thirdError){
    console.error(`Third error: ${secondError}`)
    return
  } 

  console.log('Personajes:' + ' ' + firstApiResponse!.info.count);
  console.log('Primer Personaje:' + ' ' + characterData!.name);
  console.log('Dimensión:' + ' ' + locationData!.dimension);
}

main().catch(e => console.error(e))
