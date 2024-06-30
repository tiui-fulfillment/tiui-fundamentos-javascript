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
const A = 'https://rickandmortyapi.com/api/character/';
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        return yield response.json();
    }
    catch (error) {
        console.error(`Error ${url}`);
    }
});
const X = (a) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Primer llamado...");
        const characters = yield fetchData(a);
        if (!characters) {
            throw new Error("Failed to fetch characters");
        }
        console.log("Segundo llamado...");
        const firstCharacter = yield fetchData(a + characters.results[0].id);
        if (!firstCharacter) {
            throw new Error("Failed to fetch first character");
        }
        console.log("Tercer llamado...");
        const firstCharacterOrigin = yield fetchData(firstCharacter.origin.url);
        if (!firstCharacterOrigin) {
            throw new Error("Failed to fetch frist character origin");
        }
        console.log(`Personajes: ${characters.info.count}`);
        console.log(`Primer Personaje: ${firstCharacter.name}`);
        console.log(`Dimensión: ${firstCharacterOrigin.dimension}`);
        debugger;
    }
    catch (error) {
        console.error(error);
    }
});
X(A);
