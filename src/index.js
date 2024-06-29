import { XMLHttpRequest } from "xmlhttprequest";
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

function X(a) {
  return new Promise((resolve, reject)=>{
    B.onreadystatechange = function (e) {
      if (B.readyState === 4) {
        if (B.status === 200)
          resolve(B.responseText);
        else reject(a);
      }
      else reject(a);
    };
    B.open('GET', a, false);
    B.send();;
  })
};


X(A).then(d=>{
  console.log('Primer Llamado...');
  return X(A + JSON.parse(d).results[0].id)
    .then((f=>({f, d})))
    .catch(c=>console.error(`Error  ${c}`))
}).then(({f, d})=>{
  console.log('Segundo Llamado...');
  return X(JSON.parse(f).origin.url)
    .then((h=>({h, f, d})))
    .catch(e=>console.error(`Error  ${e}`))
}).then(({h, f, d})=>{
  console.log('Tercer Llamado...');
  console.log(`Personajes: ${JSON.parse(d).info.count}`);
  console.log(`Primer Personaje: ${JSON.parse(f).name}`);
  console.log(`Dimensión: ${JSON.parse(h).dimension}`);
}).catch(g=>console.error(`Error  ${g}`))