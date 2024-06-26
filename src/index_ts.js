var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var httpRequest = require("xmlhttprequest").XMLHttpRequest;
var mortAndRickApi = 'https://rickandmortyapi.com/api/character/';
var xmlHttpRequest = new httpRequest();
/* El primer problema basicamente era un error donde no se estaba parseando el JSON correctamente
Se mandaba el xmlHttpRequest.responseText como un string y no como un objeto JSON
tambien el estatus que mandaba xmlHttpRequest.status no era el correcto, era tipo number
pero se esta comparando como texto
*/
/**
 * Función que realiza una petición a una API
 * y retorna una promesa con la respuesta
 * @param urlApi {string}
 * @returns Promise<T>
 *   Retorna una promesa con la respuesta de la API
 * @throws Error
 *  Lanza un error si la petición falla
 *  @example
 *  fetchAllData<Character>('https://rickandmortyapi.com/api/character/1');
 */
var fetchAllData = function (urlApi) {
    return new Promise(function (resolve, reject) {
        xmlHttpRequest.onreadystatechange = function (_) {
            if (xmlHttpRequest.readyState === 4) {
                if (xmlHttpRequest.status === 200) {
                    // Retornamos el valor parseado siempre para no tener que usar JSON.parse siempre que queramos usar el valor
                    resolve(JSON.parse(xmlHttpRequest.responseText));
                }
                else {
                    // Podemos lanzar un error mas estructurado o extender el error pero creo que se entiende
                    reject(new Error("".concat(urlApi)));
                }
            }
        };
        xmlHttpRequest.open('GET', urlApi, true);
        xmlHttpRequest.send();
    });
};
/**
 * Función que realiza las peticiones a la API
 * y muestra en consola la información solicitada
 * @function getResponseApi
 * @param urlAPi
 * @returns Promise<void>
 *   Retorna una promesa vacía
 *   @example
 *   getResponseApi('https://rickandmortyapi.com/api/character/1');
 */
var getResponseApi = function (urlAPi) { return __awaiter(_this, void 0, void 0, function () {
    var data, characterInfo, originInfo, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, fetchAllData(urlAPi)];
            case 1:
                data = _a.sent();
                console.log("Primer llamado...");
                return [4 /*yield*/, fetchAllData(data.results[0].url)];
            case 2:
                characterInfo = _a.sent();
                console.log("Segundo llamado...");
                return [4 /*yield*/, fetchAllData(characterInfo.origin.url)];
            case 3:
                originInfo = _a.sent();
                console.log("Tercer llamado...");
                console.log("Personajes ".concat(data.info.count));
                console.log("Primer Personaje: ".concat(characterInfo.name));
                console.log("Dimensi\u00F3n: ".concat(originInfo.name));
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error("Error: ".concat(err_1.message));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getResponseApi(mortAndRickApi)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
