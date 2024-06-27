const API_URL = "https://rickandmortyapi.com/api/character/";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error al obtener los datos de la API: ${response.status}`,
      );
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error al obtener los datos de la API: ${error.message}`);
  }
};

const main = async () => {
  try {
    console.log("Primer Llamado...");
    const data = await fetchData(API_URL);

    console.log("Segundo Llamado...");
    const firstCharacter = await fetchData(API_URL + data.results[0].id);

    console.log("Tercer Llamado...");
    const dimensionData = await fetchData(firstCharacter.origin.url);

    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${firstCharacter.name}`);
    console.log(`Dimensión: ${dimensionData.dimension}`);
  } catch (error) {
    console.error(error.message);
  }
};

main();
