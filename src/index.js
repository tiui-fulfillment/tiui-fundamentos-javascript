const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/';

function X(a) {
  return new Promise( (resolve, reject )=> {
    const B = new XMLHttpRequest();
    B.onreadystatechange = (e) =>{
      if (B.readyState == '4') {
        if (B.status === 200)
          resolve(B.responseText);
        else reject(a);
      }
      else reject(a);
    };
    B.open('GET', a, false);
    B.send();
  })
};

async function main() {
  try {
    let d = await X(A);
    console.log('Primer Llamado...');
    d = JSON.parse(d);
    const f = await X(`${A}${d.results[0].id}`);
    console.log('Segundo Llamado...');
    const h = await X(JSON.parse(f).origin.url);
    console.log('Tercer Llamado...');

    console.log(`Personajes: ${d.info.count}`);
    console.log(`PrimerPersonaje: ${JSON.parse(f).name}`);
    console.log(`Dimensión: ${JSON.parse(h).dimension}`);
  } catch (e) {
    return console.error(`Error ${e}`);
  }
}

main()