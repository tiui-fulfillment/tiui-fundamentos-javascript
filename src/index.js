const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`Error: ${xhr.status}`);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  });
};

const fetchData = async () => {
  try {
    const responseA = await X(A);
    const dataA = JSON.parse(responseA);
    console.log('Primer Llamado...');
    
    const characterId = dataA.results[0].id;
    const responseB = await X(`${A}${characterId}`);
    const dataB = JSON.parse(responseB);
    console.log('Segundo Llamado...');
    
    const originUrl = dataB.origin.url;
    const responseC = await X(originUrl);
    const dataC = JSON.parse(responseC);
    console.log('Tercer Llamado...');
    
    console.log(`Personajes: ${dataA.info.count}`);
    console.log(`Primer Personaje: ${dataB.name}`);
    console.log(`Dimensión: ${dataC.dimension}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();

//Codigo con Typescript

// import { XMLHttpRequest } from "xmlhttprequest";

// const A: string = 'https://rickandmortyapi.com/api/character/';

// const X = (url: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           resolve(xhr.responseText);
//         } else {
//           reject(`Error: ${xhr.status}`);
//         }
//       }
//     };
//     xhr.open('GET', url, true);
//     xhr.send();
//   });
// };

// const fetchData = async () => {
//   try {
//     const responseA: string = await X(A);
//     const dataA = JSON.parse(responseA);
//     console.log('Primer Llamado...');
    
//     const characterId: number = dataA.results[0].id;
//     const responseB: string = await X(`${A}${characterId}`);
//     const dataB = JSON.parse(responseB);
//     console.log('Segundo Llamado...');
    
//     const originUrl: string = dataB.origin.url;
//     const responseC: string = await X(originUrl);
//     const dataC = JSON.parse(responseC);
//     console.log('Tercer Llamado...');
    
//     console.log(`Personajes: ${dataA.info.count}`);
//     console.log(`Primer Personaje: ${dataB.name}`);
//     console.log(`Dimensión: ${dataC.dimension}`);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// fetchData();

