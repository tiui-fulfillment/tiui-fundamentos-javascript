const url = "https://rickandmortyapi.com/api/character/";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

async function getPeticion(url) {
  try {
    console.log("Primer Llamado...");
    const resultado = await fetchData(url);

    console.log("Segundo Llamado...");
    const resultado2 = await fetchData(url + resultado.results[0].id);

    console.log("Tercer Llamado...");
    const resultado3 = await fetchData(JSON.parse(resultado2).origin.url);

    console.log(`
      Personajes: ${resultado.info.count}
      Primer Personaje: ${resultado2.name}
      Dimensión: ${resultado3.dimension}
    `);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getPeticion(url);