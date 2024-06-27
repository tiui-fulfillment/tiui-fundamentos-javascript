var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B = new XMLHttpRequest();

function X(a, b) {
  B.onreadystatechange = (e) =>{
    if (B.readyState == '4') {
      if (B.status === 200)
        b(null, B.responseText);
      else return b(a);
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');
  d = JSON.parse(d)
  X(`${A}${d.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${d.info.count}`);
      console.log(`PrimerPersonaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
