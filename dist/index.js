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
const axios_1 = __importDefault(require("axios"));
const apiUrl = 'https://rickandmortyapi.com/api/character/';
const fetchApi = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw new Error(`Error fetching ${url}. Error: ${error.message}`);
    }
});
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchApi(apiUrl);
        console.log(`Personajes: ${data.info.count}`);
        const characterData = yield fetchApi(apiUrl + data.results[0].id);
        console.log(`Primer Personaje: ${characterData.name}`);
        const dimensionData = yield fetchApi(characterData.origin.url);
        console.log(`Dimensión: ${dimensionData.dimension}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error(`Unknown error occurred: ${error}`);
        }
    }
});
fetchData();
