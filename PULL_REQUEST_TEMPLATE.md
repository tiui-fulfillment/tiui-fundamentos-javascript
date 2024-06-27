## DESCRIPTION

Nombre: Luis Angel Hernandez Alvarado
Email: el.tlaloc1316@gmail.com  
WhatsApp: 5541350340
Ciudad: Ciudad de Mexico
Pais: Mexico

# Retos:
  - [ ] Primer problema
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

function X(a, b) {
  B.onreadystatechange = function (e) {
    console.log('ReadyState:', B.readyState);
    console.log('Status:', B.status);
    if (B.readyState == 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        return b(new Error(B.status));
      }
    }
  };
  B.open('GET', a, false);
  B.send();
}

X(A, function (c, d) {
  if (c) return console.error('Error:', c);
  console.log('Primer Llamado...');
  var response = JSON.parse(d);
  X(A + response.results[0].id, function (e, f) {
    if (e) return console.error('Error:', e);
    console.log('Segundo Llamado...');
    var character = JSON.parse(f);
    X(character.origin.url, function (g, h) {
      if (g) return console.error('Error:', g);
      console.log('Tercer Llamado...');
      console.log('Personajes:', response.info.count);
      console.log('Primer Personaje:', character.name);
      console.log('Dimensión:', JSON.parse(h).dimension);
    });
  });
});
  - [ ] Segundo problema
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const X = (a, b) => {
  B.onreadystatechange = (e) => {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        b(new Error(B.status));
      } 
    }
  };
  B.open('GET', a, false);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');
  const response = JSON.parse(d);
  X(`${A}${response.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');
    const character = JSON.parse(f);
    X(character.origin.url, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${response.info.count}`);
      console.log(`Primer Personaje: ${character.name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
  - [ ] Tercer problema
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const request = (url) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(B.status));
        }
      }
    };
    B.open('GET', url, false);
    B.send();
  });
};

request(A)
  .then((data) => {
    console.log('Primer Llamado...');
    const response = JSON.parse(data);
    console.log(`Personajes: ${response.info.count}`);
    return request(`${A}${response.results[0].id}`);
  })
  .then((characterData) => {
    console.log('Segundo Llamado...');
    const character = JSON.parse(characterData);
    return request(character.origin.url).then((originData) => {
      console.log('Tercer Llamado...');
      console.log(`Primer Personaje: ${character.name}`);
      console.log(`Dimensión: ${JSON.parse(originData).dimension}`);
    });
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
  - [ ] Cuarto problema
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = "https://rickandmortyapi.com/api/character/";
var B = new XMLHttpRequest();

const request = (url) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(B.status));
        }
      }
    };
    B.open("GET", url, false);
    B.send();
  });
};

const fetchCharacter = async () => {
  try {
    console.log("Primer Llamado...");
    const data = await request(A);
    const { results, info } = JSON.parse(data);
    console.log(`Personajes: ${info.count}`);

    console.log("Segundo Llamado...");
    const characterData = await request(`${A}${results[0].id}`);
    const character = JSON.parse(characterData);

    console.log("Tercer Llamado...");
    const originData = await request(character.origin.url);
    const { dimension } = JSON.parse(originData);

    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${dimension}`);

  } catch (error) {
    console.error(`Error ${error.message}`);
  }  
};

fetchCharacter();
  - [ ] Quinto problema
  - [ ] Opcional

## ¿Como explicarias el proposito de este proyecto? (opcional)
Considero que buscan ver tanto los tiempos de respuesta como las habilidades de solución de problemas relacionados con el código, a fin de que sepamos realizar requerimientos y llamados desde una API


## ¿Cuál es tu stack tecnológico preferido? ¿Por qué? (opcional)
Prefiero el backend, pues la verdad no me considero una persona muy hábil en cuanto a diseño se habla, me gusta más la situación de resolver problemas de fondo.