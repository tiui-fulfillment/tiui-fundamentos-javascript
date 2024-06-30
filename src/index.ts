import { CharactersResponse, Character, CharacterOrigin } from './types/api'

const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error ${url}`)
  }
}

const X = async (a: string) => {
  try {
    console.log("Primer llamado...")
    const characters = await fetchData<CharactersResponse>(a);

    if (!characters) {
      throw new Error("Failed to fetch characters");
    }

    console.log("Segundo llamado...")
    const firstCharacter = await fetchData<Character>(a + characters.results[0].id);

    if (!firstCharacter) {
      throw new Error("Failed to fetch first character");
    }

    console.log("Tercer llamado...")
    const firstCharacterOrigin = await fetchData<CharacterOrigin>(firstCharacter.origin.url);

    if (!firstCharacterOrigin) {
      throw new Error("Failed to fetch frist character origin");
    }

    console.log(`Personajes: ${characters.info.count}`);
    console.log(`Primer Personaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${firstCharacterOrigin.dimension}`);debugger

  } catch (error) {
    console.error(error)
  }
};

X(A)