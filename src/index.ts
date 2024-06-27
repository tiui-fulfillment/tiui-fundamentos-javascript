import axios from 'axios';

const apiUrl: string = 'https://rickandmortyapi.com/api/character/';

const fetchApi = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching ${url}. Error: ${(error as Error).message}`);
  }
};

const fetchData = async () => {
  try {
    const data = await fetchApi(apiUrl);
    console.log(`Personajes: ${data.info.count}`);

    const characterData = await fetchApi(apiUrl + data.results[0].id);
    console.log(`Primer Personaje: ${characterData.name}`);

    const dimensionData = await fetchApi(characterData.origin.url);
    console.log(`Dimensión: ${dimensionData.dimension}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unknown error occurred: ${error}`);
    }
  }
};

fetchData();
