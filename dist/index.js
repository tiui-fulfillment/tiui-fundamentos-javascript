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
const xmlhttprequest_1 = require("xmlhttprequest");
const A = 'https://rickandmortyapi.com/api/character/';
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new xmlhttprequest_1.XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                    catch (error) {
                        reject(`Error parsing JSON: ${error}`);
                    }
                }
                else {
                    reject(`HTTP error! status: ${xhr.status}`);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Primer Llamado...');
        const data1 = yield fetchData(A);
        const firstCharacterId = data1.results[0].id;
        console.log('Segundo Llamado...');
        const data2 = yield fetchData(`${A}${firstCharacterId}`);
        const originUrl = data2.origin.url;
        console.log('Tercer Llamado...');
        const data3 = yield fetchData(originUrl);
        console.log(`Personajes: ${data1.info.count}`);
        console.log(`Primer Personaje: ${data2.name}`);
        console.log(`Dimensión: ${data3.dimension}`);
    }
    catch (error) {
        console.error('Error:', error);
    }
});
main();
