const apiUrl = 'https://rickandmortyapi.com/api/character/';

// Función para obtener datos de la API usando fetch y async/await con Arrow Function
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json();
};

// Función principal para realizar múltiples llamadas a la API usando Arrow Functions y Template Strings
const ramData = async () => {
  try {
    console.log('Realizando primera llamada...');
    const initialResponse = await fetchData(apiUrl);
    const characterId = initialResponse.results[0].id;

    console.log('Realizando segunda llamada...');
    const characterDetails = await fetchData(`${apiUrl}${characterId}`);
    const characterOriginUrl = characterDetails.origin.url;

    console.log('Realizando tercera llamada...');
    const originDetails = await fetchData(characterOriginUrl);
    const numberOfResidents = originDetails.residents.length;
    const firstResidentApiUrl = originDetails.residents[0];

    console.log(`Número de residentes: ${numberOfResidents}`);
    console.log(`Dimensión del origen: ${originDetails.dimension}`);

    const residentDetails = await fetchData(firstResidentApiUrl);
    console.log(`Nombre del primer residente: ${residentDetails.name}`);
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
  }
};

// Llamada a la función principal
ramData();
