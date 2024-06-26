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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const API = "https://rickandmortyapi.com/api/character/";
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, node_fetch_1.default)(url);
    return response.json();
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Primer Llamado...");
        const data1 = yield fetchData(API);
        console.log("Segundo Llamado...");
        const data2 = yield fetchData(`${API}${data1.results[0].id}`);
        console.log("Tercer Llamado...");
        const data3 = yield fetchData(data2.origin.url);
        console.log(`Personajes: ${data1.info.count}`);
        console.log(`Primer Personaje: ${data2.name}`);
        console.log(`Dimensión: ${data3.dimension}`);
    }
    catch (error) {
        console.error(`Error: ${error}`);
    }
});
main();
