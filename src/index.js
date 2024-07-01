/*
Instead of using XMLHttpRequest switched to fetch a promise based API providing a better way to make http requests and responses.
Provides methods .then() and .catch() to handle the response and errors as well as the use of try/catch blocks.
Furthermore, JSON responses are handled with .json() method.
And finally fetch is always asynchronous returning a promise and ensuring operations that do not block the main thread,
understanding that JavaScript is single-threaded programming language.
*/
/**
 * Arrow function that fetches data from the Rick and Morty API using Promises and template strings to log the data.
 * Follows ES6 syntax however I would opt for ES8 a more modern approach using async/await.
 */
var getCharacterData = function () {
    fetch('https://rickandmortyapi.com/api/character/')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log('Primer Llamado...');
        console.log("Personajes: ".concat(data.info.count));
        return fetch(data.results[0].url);
    })
        .then(function (response) { return response.json(); })
        .then(function (characterData) {
        console.log('Segundo Llamado...');
        console.log("Primer Personaje: ".concat(characterData.name));
        return fetch(characterData.origin.url)
            .then(function (response) { return response.json(); })
            .then(function (originData) { return ({
            characterData: characterData,
            originData: originData
        }); });
    })
        .then(function (_a) {
        var characterData = _a.characterData, originData = _a.originData;
        console.log('Tercer Llamado...');
        console.log("Dimensi\u00F3n: ".concat(originData.name));
    })
        .catch(function (error) {
        console.error("Error: ".concat(error));
    });
};
getCharacterData();
