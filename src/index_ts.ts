const apiUrl: string = 'https://rickandmortyapi.com/api/character/';

// Función para obtener datos de la API usando fetch y async/await
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json();
};

// Función principal para realizar múltiples llamadas a la API y mostrar la información en consola
const RAM_Fetch = async (): Promise<void> => {
  try {
    console.log('Primer Llamado...');
    const firstResponse = await fetchData(apiUrl);
    const firstCharacterId: number = firstResponse.results[0].id;

    console.log('Segundo Llamado...');
    const characterResponse = await fetchData(`${apiUrl}${firstCharacterId}`);
    const originUrl: string = characterResponse.origin.url;

    console.log('Tercer Llamado...');
    const originResponse = await fetchData(originUrl);
    const residentsLength: number = originResponse.residents.length;
    const firstResidentUrl: string = originResponse.residents[0];

    console.log(`Personajes: ${residentsLength}`);
    console.log(`Dimensión: ${originResponse.dimension}`);

    const characterInfo = await fetchData(firstResidentUrl);
    console.log(`Nombre del primer personaje: ${characterInfo.name}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Ejecutar la función principal
RAM_Fetch();
