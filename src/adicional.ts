import axios from 'axios';

interface CharacterInfo {
  info: Info,
  results: [Results]
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Results {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: [Object],
  location: any,
  image: string,
  episode: any,
  url: string,
  created: string
};

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Location {
  name: string;
  url: string;
}

interface Dimension {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}


const url_api: string = 'https://rickandmortyapi.com/api/character/';

const fetch_Data = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Fetch Error: ${error.message}`);
  }
};

const rickandmortyapi = async (): Promise<void> => {
  try {
    console.log('Primer Llamado...');
    const data: CharacterInfo = await fetch_Data(url_api);

    console.log('Segundo Llamado...');
    const characterData: Character = await fetch_Data(`${url_api}${data.results[0].id}`);
    
    console.log('Tercer Llamado...');
    const originData: Dimension = await fetch_Data(characterData.origin.url);
    
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${characterData.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

rickandmortyapi();
