const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

const X = (a, b) => {
  const B = new XMLHttpRequest();
  B.onreadystatechange = () => {
    if (B.readyState === 4) {
      if (B.status === 200) {
        b(null, B.responseText);
      } else {
        b(`Error ${B.status}: ${B.statusText}`);
      }
    }
  };
  B.open('GET', a, true);
  B.send();
}

X(A, (c, d) => {
  if (c) return console.error(`Error: ${c}`);

  console.log('Primer Llamado...');
  const data = JSON.parse(d);

  X(`${A}${data.results[0].id}`, (e, f) => {
    if (e) return console.error(`Error: ${e}`);

    console.log('Segundo Llamado...');
    const characterData = JSON.parse(f);

    X(characterData.origin.url, (g, h) => {
      if (g) return console.error(`Error: ${g}`);

      console.log('Tercer Llamado...');
      const originData = JSON.parse(h);
      console.log(`Personajes: ${data.info.count}`);
      console.log(`Primer Personaje: ${characterData.name}`);
      console.log(`Dimensión: ${originData.dimension}`);
    });
  });
});
