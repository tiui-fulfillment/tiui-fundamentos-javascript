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
Object.defineProperty(exports, "__esModule", { value: true });
const API_ENDPOINT = "https://rickandmortyapi.com/api/character/";
// Función para hacer llamadas HTTP y obtener datos.
const fetchData = (api_url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status === 200) {
                    try {
                        const parsedResponse = JSON.parse(xhttp.responseText);
                        resolve(parsedResponse);
                        console.log(parsedResponse);
                    }
                    catch (error) {
                        reject(new Error("Error parsing response"));
                    }
                }
                else {
                    reject(new Error(`HTTP error ${xhttp.status}`));
                }
            }
        };
        xhttp.onerror = () => {
            reject(new Error("Network error"));
        };
        xhttp.open("GET", api_url, true);
        xhttp.send();
    });
};
// Función asíncrona para manejar las secuencias de llamadas a la API
function handleRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchData(API_ENDPOINT);
            console.log("Primer Llamado...");
            const character = yield fetchData(`${API_ENDPOINT}${data.results[0].id}`);
            console.log(character);
            console.log("Segundo Llamado...");
            const origin = yield fetchData(character.origin.url);
            console.log("Tercer Llamado...");
            console.log(`Personajes: ${data.info.count}`);
            console.log(`Primer Personaje: ${character.name}`);
            console.log(`Dimensión: ${origin.dimension}`);
        }
        catch (error) {
            console.error(error);
        }
    });
}
handleRequests();
