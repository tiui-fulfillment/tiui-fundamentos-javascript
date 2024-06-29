var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

const X = (a, b)=> {
  return new Promise((resolve, reject)=>{
    B.onreadystatechange = (e)=> {
      if (B.readyState == '4') {
        if (B.status === '200')
          resolve(B.responseText)
        else resolve(B.responseText);
      }
      else resolve(B.responseText);
    };
    B.open('GET', a, false);
    B.send();
  })
};

X(A).then((res)=>{
  console.log('Primer Llamado...');
  var characterCount = JSON.parse(res).info.count
  X(A+JSON.parse(res).results[0].id).then((res)=>{
    var firstCharacterName  = JSON.parse(res).name
    console.log('Segundo Llamado...');
    X(JSON.parse(res).origin.url).then((res)=>{
      console.log('Tercer Llamado...');
      var dimension = JSON.parse(res).dimension
      console.log (`Personajes: ${characterCount}`);
      console.log(`Primer Personaje: ${firstCharacterName}`);
      console.log(`Dimensión: ${dimension}`);
    })
  })
})

