const RICK_AND_MORTY_API = "https://rickandmortyapi.com/api/character/";

const fetchData = (url) =>
  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return response.json();
  });

async function getRickAndMortyData() {
  try {
    const initialData = await fetchData(RICK_AND_MORTY_API);
    console.log("Primer Llamado...");

    const firstCharacterId = initialData.results[0].id;
    const secondCallData = await fetchData(
      `${RICK_AND_MORTY_API}${firstCharacterId}`
    );
    console.log("Segundo Llamado...");

    const originUrl = secondCallData.origin.url;
    const thirdCallData = await fetchData(originUrl);
    console.log("Tercer Llamado...");

    console.log(`Personajes: ${initialData.info.count}`);
    console.log(`Primer Personaje: ${secondCallData.name}`);
    console.log(`Dimensión: ${thirdCallData.dimension}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

getRickAndMortyData();
