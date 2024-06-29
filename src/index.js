import { XMLHttpRequest } from "xmlhttprequest";
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

async function fetchData(url_api){
  return new Promise((resolve, reject)=>{
    xhttp.onreadystatechange = function (e) {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200)
          resolve(xhttp.responseText);
        else reject(new Error(url_api));
      }
      else reject(new Error(url_api));
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();;
  })
};

try{
  const data1 = await fetchData(API);
  console.log('Primer Llamado...');
  try {
    const data2 = await fetchData(API + JSON.parse(data1).results[0].id)
    console.log('Segundo Llamado...');
    try {
      const data3 = await fetchData(JSON.parse(data2).origin.url)
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(data1).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(data2).name}`);
      console.log(`Dimensión: ${JSON.parse(data3).dimension}`);
    } catch (error3) {
      console.error(`Error ${error3}`)
    }
  } catch (error2) {
    console.error(`Error ${error2}`)
  }
} catch (error1) {
  console.error(`Error ${error1}`)
}