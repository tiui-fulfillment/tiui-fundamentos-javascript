var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var A = "https://rickandmortyapi.com/api/character/";

const X = (url) => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState == 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(`Error: ${B.statusText}`));
        }
      }
    };
    B.open("GET", url, true);
    B.send();
  });
};

// const X = (a, b) => {
//   const B = new XMLHttpRequest();
//   B.onreadystatechange = () => {
//     if (B.readyState == 4) {
//       if (B.status === 200) {
//         b(null, B.responseText);
//       } else {
//         return b(a);
//       }
//     }
//   };
//   B.open("GET", a, true);
//   B.send();
// };

X(A)
  .then((d) => {
    const data = JSON.parse(d);
    console.log("Primer Llamado...");
    return X(`${A}${data.results[0].id}`).then((f) => ({ data, f }));
  })

  .then(({data, f}) => {
    const character = JSON.parse(f);
    console.log("Segundo Llamado...");
    return X(character.origin.url).then((h) => ({
      data,
      character,
      h,
    }));
  })
  .then(({ data, character, h }) => {
    const origin = JSON.parse(h);
    console.log("Tercer Llamado...");
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${origin.dimension}`);
  })
  .catch((error) => console.error(error));


// X(A, (c, d) => {
//   if (c) return console.error(`Error: ${c}`);

//   const data = JSON.parse(d);
//   console.log("Primer Llamado...");
//   X(`${A}${data.results[0].id}`, (e, f) => {
//     if (e) return console.error(`Error: ${e}`);

//     const character = JSON.parse(f);
//     console.log("Segundo Llamado...");
//     X(character.origin.url, (g, h) => {
//       if (g) return console.error(`Error ${g}`);
//       const origin = JSON.parse(h);
//       console.log("Tercer Llamado...");
//       console.log(`Personajes: ${data.info.count}`);
//       console.log(`Primer Personaje: ${character.name}`);
//       console.log(`Dimensión: ${origin.dimension}`);
//     });
//   });
// });
