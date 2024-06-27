/*
  Utilicé el módulo de 'axios' ya que el de XMLHttpRequest me estaba dando problemas
  y no podía hacer que funcionara con typescript, así que busqué una alternativa.
  
  Comandos para instalar axios:
    npm install axios
    npm install @types/axios --save-dev
*/

import axios from 'axios';

const A: string = "https://rickandmortyapi.com/api/character/";

function X3(a : string): Promise<string> {
  return axios.get(a)
    .then(r => r.data)
    .catch(error => {
      throw new Error(`Error: ${error.response.status}`);
    });
}

let d: any;
let f: any;
let h: any;

X3(A)
  .then(r => {
    d= r;
    console.log(`Primer Llamado...`);
    return X3(A + d.results[0].id);
  })
  .then(r => {
    f = r;
    console.log(`Segundo Llamado...`);
    return X3(f.origin.url);
  })
  .then(r => {
    h = r;
    console.log(`Tercer Llamado...`);
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${h.dimension}`);
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
