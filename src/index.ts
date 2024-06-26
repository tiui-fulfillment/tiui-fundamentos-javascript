import fetch from "node-fetch";

interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

interface ApiResponse {
  info: {
    count: number;
  };
  results: Character[];
}

interface Location {
  dimension: string;
}

const API = "https://rickandmortyapi.com/api/character/";

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

const main = async (): Promise<void> => {
  try {
    console.log("Primer Llamado...");
    const data1: ApiResponse = await fetchData(API);

    console.log("Segundo Llamado...");
    const data2: Character = await fetchData(`${API}${data1.results[0].id}`);

    console.log("Tercer Llamado...");
    const data3: Location = await fetchData(data2.origin.url);

    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

main();
