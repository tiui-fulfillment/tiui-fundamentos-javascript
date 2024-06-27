

const url = "https://rickandmortyapi.com/api/character/";


async function fetchDatos(url) {
  const result = await fetch(url)
  .then(response => response.json())
  .catch(error => error);

  return result
  
}

async function peticion(url) {
  try {
    console.log("Primer Llamado...");
    const resultado = await fetchDatos(url);

    console.log("Segundo Llamado...");
    const resultado2 = await fetchDatos(url + resultado.results[0].id);

    console.log("Tercer Llamado...");
    const resultado3 = await fetchDatos(resultado2.origin.url);

    console.log(`
      Personajes: ${resultado.info.count}
      Primer Personaje: ${resultado2.name}
      Dimensión: ${resultado3.dimension}
    `);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

peticion(url)
