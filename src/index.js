const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = (a, b) => {
  const B = new XMLHttpRequest();
  B.onreadystatechange = () => {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        b(new Error(`HTTP error! status: ${B.status}`));
      }
    }
  };
  B.open('GET', a, true);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error: ${c.message}`);
  const data = JSON.parse(d);
  console.log('Primer Llamado...');
  X(`${A}${data.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error: ${e.message}`);
    const character = JSON.parse(f);
    console.log('Segundo Llamado...');
    X(character.origin.url, (g, h) => {
      if (g) return console.error(`Error: ${g.message}`);
      const origin = JSON.parse(h);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${data.info.count}`);
      console.log(`Primer Personaje: ${character.name}`);
      console.log(`Dimensión: ${origin.dimension}`);
    });
  });
});
