import axios from "axios";

const A: string = "https://rickandmortyapi.com/api/character/";

// Función asincrónica utilizando arrow function y promesas para obtener datos de la URL
const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función principal asincrónica para ejecutar el flujo principal del programa
async function main(): Promise<void> {
  try {
    console.log("Primer Llamado...");
    const data = await fetchData(A);

    const characterId: number = data.results[0].id;

    console.log("Segundo Llamado...");
    const characterData = await fetchData(`${A}${characterId}`);

    const originUrl: string = characterData.origin.url;

    console.log("Tercer Llamado...");
    const originData = await fetchData(originUrl);

    // Muestra los resultados obtenidos
    console.log("Personajes:", data.info.count);
    console.log("Primer Personaje:", characterData.name);
    console.log("Dimensión:", originData.dimension);
  } catch (error:any) {
    console.error("Error:", error.message);
  }
}

main();
