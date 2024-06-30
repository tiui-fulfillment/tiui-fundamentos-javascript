const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const X = (a, b) => {
  B.onload = (e) => {
    if (B.readyState == '4' && B.status == '200') {
        b(null, JSON.parse(B.responseText));
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A, (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');

  X(A + d.results[0].id, (e, f) => {
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');

    X(f.origin.url, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');

      X(h.url, (i, j) => {
        if(i) return console.error(`Error ${i}`);
        console.log(`Personajes: ${d.info.count}`);
        console.log(`Primer Personaje: ${f.name}`);
        console.log(`Dimensión: ${h.dimension}`);
      })
      
    });

  });
});
