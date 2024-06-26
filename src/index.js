const https = require('https');

const API = 'https://rickandmortyapi.com/api/character/';

function makeRequest(url, callback) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      callback(null, data);
    });
  }).on('error', (err) => {
    callback(err, null);
  });
}

makeRequest(API, (err, data) => {
  if (err) return console.error(err);
  console.log('Primer Llamado...');
  const jsonData = JSON.parse(data);
  makeRequest(API + jsonData.results[0].id, (err, data) => {
    if (err) return console.error(err);
    console.log('Segundo Llamado...');
    const characterData = JSON.parse(data);
    makeRequest(characterData.origin.url, (err, data) => {
      if (err) return console.error(err);
      console.log('Tercer Llamado...');
      const originData = JSON.parse(data);
      console.log('Personajes:', jsonData.info.count);
      console.log('Primer Personaje:', characterData.name);
      console.log('Dimensión:', originData.dimension);
    });
  });
});