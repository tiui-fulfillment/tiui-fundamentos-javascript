import fetch from "node-fetch";

const A = "https://rickandmortyapi.com/api/character/";

const X = (a: string): Promise<string> => {
  return fetch(a).then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.text();
  });
};

const fetchData = async () => {
  try {
    const d = await X(A);
    console.log("Primer Llamado...");
    const data = JSON.parse(d);

    const f = await X(A + data.results[0].id);
    console.log("Segundo Llamado...");
    const character = JSON.parse(f);

    const h = await X(character.origin.url);
    console.log("Tercer Llamado...");

    console.log("Personajes:", data.info.count);
    console.log("Primer Personaje:", character.name);
    console.log("Dimensión:", JSON.parse(h).dimension);
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchData();
