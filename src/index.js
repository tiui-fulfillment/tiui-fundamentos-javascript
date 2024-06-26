const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = (url) => {
  return new Promise((resolve, reject) =>{
    const B = new XMLHttpRequest();
    B.onreadystatechange = () =>{
      if(B.readyState === 4){
        if(B.status === 200)
          resolve(JSON.parse(B.responseText));
        else
          reject(new Error('Error ' + B.status));
      }
    }
    B.open('GET', url, false);
    B.send();
  });  
}

let d, f;

X(A)
  .then(data => {
    d = data;
    console.log('Primer Llamado...');
    return X(A + d.results[0].id);
  })
  .then(data => {
    console.log('Segundo Llamado...');
    f = data;
    return X(f.origin.url);
  })
  .then(data => {
    console.log('Tercer Llamado...');
    console.log(`Personajes: ${d.info.count}`);
    console.log(`Primer Personaje: ${f.name}`);
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch(error => {
    console.error('Error: ' + error.message);
  });

/*function X(a, b) {
  const B = new XMLHttpRequest();
  B.onreadystatechange = function (e) {
    if (B.readyState == 4) {
      if (B.status === 200)
        b(null, JSON.parse(B.responseText));
        //b(null, B.responseText);
      else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, function (c, d) {
  if (c) return console.error('Error' + ' ' + c);
  console.log('Primer Llamado...');
  X(A + d.results[0].id, function (e, f) {
    if (e) return console.error('Error' + ' ' + e);
    console.log('Segundo Llamado...');
    X(f.origin.url, function (g,h) {
    //X(JSON.parse(f).origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);
      console.log('Tercer Llamado...');
      console.log('Lo que hay en d:', d);
      console.log('Personajes:' + ' ' + d.info.count);
      //console.log('Personajes:' + ' ' + JSON.parse(d).info.count);
      console.log('Primer Personaje:' + ' ' + f.name);
      //console.log('Primer Personaje:' + ' ' + JSON.parse(f).name);
      console.log('Dimensión:' + ' ' + h.dimension);
      //console.log('Dimensión:' + ' ' + JSON.parse(h).dimension);
    });
  });
});*/