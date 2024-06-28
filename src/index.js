const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const X = (a) => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = function (e) {
      if (B.readyState == '4') {
        if (B.status == '200')
          resolve(B.responseText);
        else return reject(a);
      }
      else return reject(a);
    };
    B.open('GET', a, false);
    B.send();
  })
};

X(A).then((b) => {
  console.log('Primer Llamado...');
  X(A + JSON.parse(b).results[0].id).then(c => {
    console.log('Segundo Llamado...');
    X(JSON.parse(c).origin.url).then(e => {
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(b).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(c).name}`);
      console.log(`Dimensión: ${JSON.parse(e).dimension}`);
    }).catch(error3 => {
      console.error(`Error ${error3}`);
    });
  }).catch(error2 => {
    console.error(`Error ${error2}`);
  });
}).catch(error1 => {
  console.error(`Error ${error1}`);
});
