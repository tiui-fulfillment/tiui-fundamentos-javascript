"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Species = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Female"] = "Female";
    Gender["Male"] = "Male";
    Gender["Unknown"] = "unknown";
})(Gender || (exports.Gender = Gender = {}));
var Species;
(function (Species) {
    Species["Alien"] = "Alien";
    Species["Human"] = "Human";
})(Species || (exports.Species = Species = {}));
var Status;
(function (Status) {
    Status["Alive"] = "Alive";
    Status["Dead"] = "Dead";
    Status["Unknown"] = "unknown";
})(Status || (exports.Status = Status = {}));
