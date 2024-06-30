"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xmlhttprequest_1 = require("xmlhttprequest");
var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new xmlhttprequest_1.XMLHttpRequest;
function fetchData(url_api) {
    var promise = new Promise(function (resolve, reject) {
        try {
            xhttp.open('GET', url_api, false, '', '');
            xhttp.onreadystatechange = function (e) {
                if (xhttp.readyState === 4 && xhttp.status === 200)
                    resolve(JSON.parse(xhttp.responseText));
                else
                    reject(url_api);
            };
            xhttp.send(null);
        }
        catch (error) {
            reject(error);
        }
    });
    return promise;
}
fetchData(API)
    .then(function (data1) {
    console.log('Primer Llamado...');
    console.log("Personajes:  ".concat(data1.info.count));
    return fetchData(API + data1.results[0].id);
})
    .then(function (data2) {
    console.log('Segundo Llamado...');
    console.log("Primer Personaje: ".concat(data2.name));
    return fetchData(data2.origin.url);
})
    .then(function (data3) {
    console.log('Tercer Llamado...');
    console.log("Dimensi\u00F3n: ".concat(data3.dimension));
})
    .catch(function (error) { return console.error("Error ".concat(error)); })
    .finally(function () { return 'Done'; });
