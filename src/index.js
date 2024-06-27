/* Cuarto problema: MOdificacion de codigo para mejorar la optimizacion, legibilidad y eficiencia */

const A = "https://rickandmortyapi.com/api/character/";

const fetchCharacterData = async () => {
  try {
    const response = await fetch(A);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const d = await response.json();
    console.log("Primer Llamado...");

    if (d.results && d.results.length > 0) {
      const responseF = await fetch(`${A}${d.results[0].id}`);
      if (!responseF.ok) {
        throw new Error(`HTTP error: ${responseF.status}`);
      }
      const f = await responseF.json();
      console.log("Segundo Llamado...");

      const responseH = await fetch(f.origin.url);
      if (!responseH.ok) {
        throw new Error(`HTTP error: ${responseH.status}`);
      }
      const h = await responseH.json();
      console.log("Tercer Llamado...");

      console.log(`Personajes: ${d.info.count}`);
      console.log(`Primer Personaje: ${f.name}`);
      console.log(`Dimensión: ${h.dimension}`);
    } else {
      console.error("No results found");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

fetchCharacterData();
