var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

const X = (a, b)=> {
  B.onreadystatechange = (e)=> {
    if (B.readyState == '4') {
      if (B.status === '200')
        b(null, B.responseText);
      else return b(a, B.responseText);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, (c, d)=> {
  if (!d) return console.error('Error: not data found');
  console.log('Primer Llamado...');
  X(A + JSON.parse(d).results[0].id, (e, f) => {
    if (!f) return console.error('Error: not data found');
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, (g, h) => {
      if (!h) return console.error('Error: not data found');
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(d).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
