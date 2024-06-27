import { XMLHttpRequest } from "xmlhttprequest";

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest(); 

const X = (a, b) => {
  B.onreadystatechange = (e) => {
    if (B.readyState == '4') {
      if (B.status === 200) {
        try {
          const parsedResponse = JSON.parse(B.responseText)
          b(null, parsedResponse);
        } catch (error) {
          b(new Error('Error parsing response'));
        }
      } else {
        return b(a);
      }
    }
    else return b(a);
  };
  B.open('GET', a, false);
  B.send();
};

X(A,  (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');
  X(A + d.results[0].id,  (e, f) => {
    if (e) return console.error(`Error ${e}`);
    console.log('Segundo Llamado...');
    X(f.origin.url,  (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${d.info.count}`);
      console.log(`Primer Personaje: ${f.name}`);
      console.log(`Dimensión: ${h.dimension}`);
    });
  });
});
