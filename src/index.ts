const API_BASE: string = 'https://rickandmortyapi.com/api/character/';

const fetchData = async (API: string): Promise<any> => {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const app = async () => {
  try {
    const data1 = await fetchData(API_BASE);
    console.log('Primer Llamado...');

    const data2 = await fetchData(`${API_BASE}${data1.results[0].id}`);
    console.log('Segundo Llamado...');

    const data3 = await fetchData(data2.origin.url);
    console.log('Tercer Llamado...');

    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

app();
