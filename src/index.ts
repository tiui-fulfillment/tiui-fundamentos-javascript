import { CharacterList, Character, Dimension } from "./interfaces";

const API_URL = "https://rickandmortyapi.com/api/character/";

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}`);
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching data from ${url}: ${error.message}`);
    } else {
      throw new Error(`Unknown error: ${error}`);
    }
  }
};

const main = async (): Promise<void> => {
  try {
    console.log("Primer Llamado...");
    const data: CharacterList = await fetchData<CharacterList>(API_URL);

    console.log("Segundo Llamado...");
    const firstCharacter: Character = await fetchData<Character>(
      API_URL + data.results[0].id,
    );

    console.log("Tercer Llamado...");
    const dimensionData = await fetchData<Dimension>(firstCharacter.origin.url);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${dimensionData.dimension}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(`Unknown error: ${error}`);
    }
  }
};

main();
