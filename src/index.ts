import axios from 'axios';

interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

interface CharacterList {
  info: {
    count: number;
  };
  results: Character[];
}

const baseUrl: string = 'https://rickandmortyapi.com/api/character/';

// Función para hacer una solicitud HTTP y devolver una promesa con los datos
const makeRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${url}: ${error.message}`);
  }
};

// Función principal para obtener y mostrar la información de los personajes
const fetchCharacterData = async () => {
  try {
    console.log('Primer Llamado...');
    const charactersResponse: CharacterList = await makeRequest<CharacterList>(baseUrl);
    const firstCharacterUrl: string = `${baseUrl}${charactersResponse.results[0].id}`;

    console.log('Segundo Llamado...');
    const firstCharacterResponse: Character = await makeRequest<Character>(firstCharacterUrl);
    const originUrl: string = firstCharacterResponse.origin.url;

    console.log('Tercer Llamado...');
    const originResponse: any = await makeRequest<any>(originUrl);

    console.log('Información obtenida:');
    console.log(`Número de personajes: ${charactersResponse.info.count}`);
    console.log(`Nombre del primer personaje: ${firstCharacterResponse.name}`);
    console.log(`Dimensión del primer personaje: ${originResponse.dimension}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Llamar a la función principal para iniciar el proceso
fetchCharacterData();
