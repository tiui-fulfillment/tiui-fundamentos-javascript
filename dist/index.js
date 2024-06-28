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
const API_BASE = 'https://rickandmortyapi.com/api/character/';
const fetchData = (API) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(API);
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }
        const data = yield res.json();
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
});
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data1 = yield fetchData(API_BASE);
        console.log('Primer Llamado...');
        const data2 = yield fetchData(`${API_BASE}${data1.results[0].id}`);
        console.log('Segundo Llamado...');
        const data3 = yield fetchData(data2.origin.url);
        console.log('Tercer Llamado...');
        console.log(`Personajes: ${data1.info.count}`);
        console.log(`Primer Personaje: ${data2.name}`);
        console.log(`Dimensión: ${data3.dimension}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
});
app();
