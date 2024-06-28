import { XMLHttpRequest } from 'xmlhttprequest';

const A = 'https://rickandmortyapi.com/api/character/';
const B = new XMLHttpRequest();

const initialCall = url => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = function () {
      if (B.readyState == 4) {
        if (B.status === 200) {
          resolve(B.responseText);
          reject(
            new Error(`Error requesting a resource not found: ${B.status}`)
          );
        }
        reject(
          new Error(`Error requesting a resource: ${B.status}, url: ${url}`)
        );
      }
    };
    B.open('GET', url, false);
    B.send();
  });
};

const functionX = url => {
  return initialCall(url).then(response => JSON.parse(response));
};

functionX(A)
  .then(res => {
    console.log(`Characters count: ${res.info.count}`);
    return functionX(A + res.results[0].id);
  })
  .then(res => {
    console.log(`First Character: ${res.name}`);
    return functionX(res.origin.url);
  })
  .then(res => {
    console.log(`Dimension: ${res.dimension}`);
  })
  .catch(e => console.log(e.message));
