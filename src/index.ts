const Url: string = "https://rickandmortyapi.com/api/character/";

// Definir interfaces para los datos de la API
interface Character {
  id: number;
  name: string;
  origin: {
    name: string;
    url: string;
  };
}

interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: T[];
}

// Función para hacer una solicitud usando fetch y parsear la respuesta como JSON
const makeRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

// Función principal para obtener y procesar los datos del personaje
const getCharacterData = async (): Promise<void> => {
  try {
    console.log("Primer Llamado...");

    // Primer llamada para obtener la lista de personajes
    const initialData = await makeRequest<ApiResponse<Character>>(Url);
    const firstCharacterUrl = `${Url}${initialData.results[0].id}`;

    console.log("Segundo Llamado...");

    // Hacer solicitudes en paralelo: obtener datos del primer personaje y reutilizar initialData
    const [character, initialDataAgain] = await Promise.all([
      makeRequest<Character>(firstCharacterUrl),
      Promise.resolve(initialData), // Reutilizar los datos iniciales
    ]);

    console.log("Tercer Llamado...");

    // Obtener los datos de origen del personaje
    const origin = await makeRequest<{ dimension: string }>(
      character.origin.url
    );

    // Mostrar la información obtenida
    console.log(`Personajes: ${initialDataAgain.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  } catch (error) {
    // Manejo de errores
    console.error(`Error: ${(error as Error).message}`);
  }
};

// Llamar a la función principal para iniciar el proceso
getCharacterData();
