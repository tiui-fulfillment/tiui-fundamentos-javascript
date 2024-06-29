import { XMLHttpRequest } from "xmlhttprequest";

const url:string = 'https://rickandmortyapi.com/api/character/';
const request:globalThis.XMLHttpRequest = new XMLHttpRequest();

const MakeRequest : (requestUrl: string) => Promise<string> = (requestUrl:string)=>
    new Promise((resolve, reject)=>{
        request.onreadystatechange = function (e) {
          if (request.readyState === 4) {
            if (request.status === 200) resolve(request.responseText);
            else reject(request.status.toString());
          }
        };
        request.open('GET', requestUrl, false);
        request.send();
      })

MakeRequest(url).then((res:string)=>{
  const characterCount:number = JSON.parse(res).info.count
  const firstCharacterId:string = JSON.parse(res).results[0].id
  const firstCharacterUrl:string = url+firstCharacterId
  console.log('Primer Llamado...');
  MakeRequest(firstCharacterUrl).then((res:string)=>{
    const firstCharacterName:string  = JSON.parse(res).name
    const originUrl:string = JSON.parse(res).origin.url
    console.log('Segundo Llamado...');
    MakeRequest(originUrl).then((res:string)=>{
      const firstCharacterOrigin:string = JSON.parse(res).dimension
      console.log('Tercer Llamado...');
      console.log (`Personajes: ${characterCount}`);
      console.log(`Primer Personaje: ${firstCharacterName}`);
      console.log(`Dimensión: ${firstCharacterOrigin}`);
    })
  })
}).catch((err:string)=>{
  console.error(`Error al realizar la petición. Status: ${err}`)
})
