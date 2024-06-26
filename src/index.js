const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest;

const X = (a, b) => {
  B.onreadystatechange = () => {
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
  X(A + JSON.parse(d).results[0].id, (e, f) => {
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');
    X(JSON.parse(f).origin.url, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(d).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
