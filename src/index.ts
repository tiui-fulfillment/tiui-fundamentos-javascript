import { Characters, Character, LocationDetail } from "./types";

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

// En este ejemplo si utilice fetch. :b
/**
 * This function makes a get request to an url and returns te content as json.
 * @param url Url to call
 */
async function callApi(url: string):  Promise<Characters | Character | LocationDetail> {
  try {
    const res = await fetch(url)
    const d = await res.json()
    return d as Characters | Character | LocationDetail
  } catch (error) {
    throw new Error(url);
  }
};

async function main() {
  try {
    const characters = await callApi(BASE_URL) as Characters;
    console.log('Primer Llamado...');

    const firstCharacter = await callApi(`${BASE_URL}${characters.results[0].id}`) as Character;
    console.log('Segundo Llamado...');

    const location = await callApi(firstCharacter.origin.url) as LocationDetail;
    console.log('Tercer Llamado...');

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`PrimerPersonaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${location.dimension}`);
  } catch (e) {
    return console.error(`Error ${e}`);
  }
}

main()