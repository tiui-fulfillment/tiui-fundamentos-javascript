var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from "node-fetch";
const A = "https://rickandmortyapi.com/api/character/";
const X = (a) => {
    return fetch(a).then((response) => {
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }
        return response.text();
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d = yield X(A);
        console.log("Primer Llamado...");
        const data = JSON.parse(d);
        const f = yield X(A + data.results[0].id);
        console.log("Segundo Llamado...");
        const character = JSON.parse(f);
        const h = yield X(character.origin.url);
        console.log("Tercer Llamado...");
        console.log("Personajes:", data.info.count);
        console.log("Primer Personaje:", character.name);
        console.log("Dimensión:", JSON.parse(h).dimension);
    }
    catch (error) {
        console.error("Error:", error);
    }
});
fetchData();
