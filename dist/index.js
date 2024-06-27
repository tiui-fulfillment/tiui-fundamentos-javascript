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
const A = "https://rickandmortyapi.com/api/character/";
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}`);
        }
        return yield response.json();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching data from ${url}: ${error.message}`);
        }
        else {
            throw new Error(`Unknown error: ${error}`);
        }
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Primer Llamado...");
        const data = yield fetchData(A);
        console.log("Segundo Llamado...");
        const firstCharacter = yield fetchData(A + data.results[0].id);
        console.log("Tercer Llamado...");
        const dimensionData = yield fetchData(firstCharacter.origin.url);
        console.log(`Personajes: ${data.info.count}`);
        console.log(`Primer Personaje: ${firstCharacter.name}`);
        console.log(`Dimensión: ${dimensionData.dimension}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        else {
            console.error(`Unknown error: ${error}`);
        }
    }
});
main();
