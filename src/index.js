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
const baseUrl = "https://rickandmortyapi.com/api/character/";
function sendRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        return response.json();
    });
}
function printResults() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firstCall = yield sendRequest(baseUrl);
            console.log('Primer llamado');
            const secondCall = yield sendRequest(`${baseUrl}${firstCall.results[0].id}`);
            console.log('Segundo llamado');
            const thirdCall = yield sendRequest(secondCall.origin.url);
            console.log('Tercer llamado');
            console.log('Personajes: ' + firstCall.info.count);
            console.log('Primer Personaje: ' + secondCall.name);
            console.log('Dimensión: ' + thirdCall.dimension);
        }
        catch (error) {
            console.error('Request failed', error);
        }
    });
}
printResults();
