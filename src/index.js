"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const A = "https://rickandmortyapi.com/api/character/";
// Función asincrónica utilizando arrow function y promesas para obtener datos de la URL
const fetchData = async (url) => {
    try {
        const response = await axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
// Función principal asincrónica para ejecutar el flujo principal del programa
async function main() {
    try {
        console.log("Primer Llamado...");
        const data = await fetchData(A);
        const characterId = data.results[0].id;
        console.log("Segundo Llamado...");
        const characterData = await fetchData(`${A}${characterId}`);
        const originUrl = characterData.origin.url;
        console.log("Tercer Llamado...");
        const originData = await fetchData(originUrl);
        // Muestra los resultados obtenidos
        console.log("Personajes:", data.info.count);
        console.log("Primer Personaje:", characterData.name);
        console.log("Dimensión:", originData.dimension);
    }
    catch (error) {
        console.error("Error:", error.message);
    }
}
main();
