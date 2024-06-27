const XMLHttpRequestNode = require("xmlhttprequest").XMLHttpRequest;

const A: string = 'https://rickandmortyapi.com/api/character/';
const B: XMLHttpRequest = new XMLHttpRequestNode();

const fetchData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(new Error(`Error: ${B.statusText}`));
        }
      }
    };
    B.open('GET', url, true);
    B.send();
  });
};

const fetchAllData = async () => {
  try {
    const response1: string = await fetchData(A);
    const data1 = JSON.parse(response1);
    console.log('Primer Llamado...');

    const response2: string = await fetchData(`${A}${data1.results[0].id}`);
    const data2 = JSON.parse(response2);
    console.log('Segundo Llamado...');

    const response3: string = await fetchData(data2.origin.url);
    const data3 = JSON.parse(response3);
    console.log('Tercer Llamado...');

    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error(error);
  }
};

fetchAllData();
