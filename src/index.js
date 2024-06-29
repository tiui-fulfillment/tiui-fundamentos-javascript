var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';

function X(a, b) {
  const B = new XMLHttpRequest();
  B.onreadystatechange = function () {
    if (B.readyState == 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        return b(a);
      }
    }
  };
  B.open('GET', a, true);
  B.send();
}

X(A, function (c, d) {
  if (c) return console.error('Error: ' + c);
  
  const data = JSON.parse(d);
  console.log('Primer Llamado...');
  X(A + data.results[0].id, function (e, f) {
    if (e) return console.error('Error' + ' ' + e);
    
    const character = JSON.parse(f);
    console.log('Segundo Llamado...');
    X(character.origin.url, function (g, h) {
      if (g) return console.error('Error' + ' ' + g);     
      const origin = JSON.parse(h);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + data.info.count);
      console.log('Primer Personaje:' + ' ' + character.name);
      console.log('Dimensión:' + ' ' + origin.dimension);
    });
  });
});
