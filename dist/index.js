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
const NodeXMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const A = "https://rickandmortyapi.com/api/character/";
const X = (a) => {
    return new Promise((resolve, reject) => {
        const B = new NodeXMLHttpRequest();
        B.onreadystatechange = () => {
            if (B.readyState === 4) {
                if (B.status === 200) {
                    resolve(B.responseText);
                }
                else {
                    reject(`Error: ${B.status}`);
                }
            }
        };
        B.open("GET", a, true);
        B.send();
    });
};
const parseJSON = (response) => {
    try {
        return JSON.parse(response);
    }
    catch (err) {
        throw new Error(`Error en JSON: ${err}`);
    }
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d = yield X(A);
        console.log(`Primer Llamado... ${d}`);
        const data = parseJSON(d);
        console.log("Parsed data: ", data);
        if (!data.results || data.results.length === 0) {
            throw new Error("Sin resultados");
        }
        const f = yield X(`${A}${data.results[0].id}`);
        console.log(`Segundo Llamado... ${f}`);
        const character = parseJSON(f);
        const h = yield X(character.origin.url);
        console.log("Tercer Llamado...");
        const originData = parseJSON(h);
        console.log(`Personajes: ${originData.residents.length}`);
        console.log(`Primer Personaje: ${character.name}`);
        console.log(`Dimensión: ${originData.dimension}`);
    }
    catch (err) {
        console.error(err);
    }
});
main();
