import { XMLHttpRequest } from "xmlhttprequest";

const url = 'https://rickandmortyapi.com/api/character/';
const request = new XMLHttpRequest();

const MakeRequest = (requestUrl)=>
   new Promise((resolve, reject)=>{
    request.onreadystatechange = function (e) {
      if (request.readyState === 4) {
        if (request.status === 200) resolve(request.responseText);
        else reject(request.status);
      }
    };
    request.open('GET', requestUrl, false);
    request.send();
  })

MakeRequest(url).then((res)=>{
  const characterCount = JSON.parse(res).info.count
  const firstCharacterId = JSON.parse(res).results[0].id
  const firstCharacterUrl = url+firstCharacterId
  console.log('Primer Llamado...');
  MakeRequest(firstCharacterUrl).then((res)=>{
    const firstCharacterName  = JSON.parse(res).name
    const originUrl = JSON.parse(res).origin.url
    console.log('Segundo Llamado...');
    MakeRequest(originUrl).then((res)=>{
      const firstCharacterOrigin = JSON.parse(res).dimension
      console.log('Tercer Llamado...');
      console.log (`Personajes: ${characterCount}`);
      console.log(`Primer Personaje: ${firstCharacterName}`);
      console.log(`Dimensión: ${firstCharacterOrigin}`);
    })
  })
}).catch((err)=>{
  console.error(`Error al realizar la petición. Status: ${err}`)
})

