var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = 'https://rickandmortyapi.com/api/character/';
var B;

const X = (a, b) => {
  B = new XMLHttpRequest();
  B.onreadystatechange = () => {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        return b(new Error(`Request failed with status ${B.status}`));
      }
    }
  };
  B.open('GET', a, true);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error: ${c.message}`);
  console.log('Primer Llamado...');
  var data = JSON.parse(d);
  X(`${A}${data.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error: ${e.message}`);
    console.log('Segundo Llamado...');
    var character = JSON.parse(f);
    X(character.origin.url, (g, h) => {
      if (g) return console.error(`Error: ${g.message}`);
      console.log('Tercer Llamado...');
      var origin = JSON.parse(h);
      console.log(`Personajes: ${data.info.count}`);
      console.log(`Primer Personaje: ${character.name}`);
      console.log(`Dimensión: ${origin.dimension}`);
    });
  });
});