const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiUrl = 'https://rickandmortyapi.com/api/character/';
const xmlHttpsRequest = new XMLHttpRequest();

const fetchData = (apiUrl, callback) => {
  xmlHttpsRequest.onreadystatechange = () => {
    if (xmlHttpsRequest.readyState === 4) {
      if (xmlHttpsRequest.status === 200) {
        callback(null, xmlHttpsRequest.responseText);
      } else {
        callback(xmlHttpsRequest.status);
      }
    }
  };
  xmlHttpsRequest.open('GET', apiUrl, false);
  xmlHttpsRequest.send();
};

fetchData(apiUrl, (c, d) => {
  if (c) return console.error(`Error ${c}`);
  console.log('Primer Llamado...');
  const firstCharacterId = JSON.parse(d).results[0].id;
  
  fetchData(apiUrl + firstCharacterId, (e, f) => {
    if (e) return console.error(`Error ${e}`);

    console.log('Segundo Llamado...');
    const originUrl = JSON.parse(f).origin.url;
    
    fetchData(originUrl, (g, h) => {
      if (g) return console.error(`Error ${g}`);
      console.log('Tercer Llamado...');
      console.log(`Personajes: ${JSON.parse(d).info.count}`);
      console.log(`Primer Personaje: ${JSON.parse(f).name}`);
      console.log(`Dimensión: ${JSON.parse(h).dimension}`);
    });
  });
});
