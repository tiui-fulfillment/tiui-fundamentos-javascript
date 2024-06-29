//const xhttp = require("xmlhttprequest").XMLHttpRequest;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API = 'https://rickandmortyapi.com/api/character/';
import { XMLHttpRequest  } from "xmlhttprequest";
const xhttp = new XMLHttpRequest();
function fetchData(url_api) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    if (xhttp.status === 200)
                        resolve(xhttp.responseText);
                    else
                        reject(new Error(url_api));
                }
                else
                    reject(new Error(url_api));
            };
            xhttp.open('GET', url_api, false);
            xhttp.send();
            ;
        });
    });
}
;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data1 = yield fetchData(API);
        console.log('Primer Llamado...');
        try {
            const data2 = yield fetchData(API + JSON.parse(data1).results[0].id);
            console.log('Segundo Llamado...');
            try {
                const data3 = yield fetchData(JSON.parse(data2).origin.url);
                console.log('Tercer Llamado...');
                console.log(`Personajes: ${JSON.parse(data1).info.count}`);
                console.log(`Primer Personaje: ${JSON.parse(data2).name}`);
                console.log(`Dimensión: ${JSON.parse(data3).dimension}`);
            }
            catch (error3) {
                console.error(`Error ${error3}`);
            }
        }
        catch (error2) {
            console.error(`Error ${error2}`);
        }
    }
    catch (error1) {
        console.error(`Error ${error1}`);
    }
}))();
export {};
