"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Url = "https://rickandmortyapi.com/api/character/";
// Función para hacer una solicitud usando fetch y parsear la respuesta como JSON
const makeRequest = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
});
// Función principal para obtener y procesar los datos del personaje
const getCharacterData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Primer Llamado...");
        // Primer llamada para obtener la lista de personajes
        const initialData = yield makeRequest(Url);
        const firstCharacterUrl = `${URL}${initialData.results[0].id}`;
        console.log("Segundo Llamado...");
        // Hacer solicitudes en paralelo: obtener datos del primer personaje y reutilizar initialData
        const [character, initialDataAgain] = yield Promise.all([
            makeRequest(firstCharacterUrl),
            Promise.resolve(initialData), // Reutilizar los datos iniciales
        ]);
        console.log("Tercer Llamado...");
        // Obtener los datos de origen del personaje
        const origin = yield makeRequest(character.origin.url);
        // Mostrar la información obtenida
        console.log(`Personajes: ${initialDataAgain.info.count}`);
        console.log(`Primer Personaje: ${character.name}`);
        console.log(`Dimensión: ${origin.dimension}`);
    }
    catch (error) {
        // Manejo de errores
        console.error(`Error: ${error.message}`);
    }
});
// Llamar a la función principal para iniciar el proceso
getCharacterData();
