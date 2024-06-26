const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API_URL = 'https://rickandmortyapi.com/api/character/';

function getData(url, callback) {
  const xml = new XMLHttpRequest();

  xml.onreadystatechange = function (e) {
    if (xml.readyState === 4) {
      if (xml.status === 200){
        console.log('entro acá')
        const reponseParsed = JSON.parse(xml.responseText)
        callback(null, reponseParsed);
      }
      else {
        return callback(new Error('Request failed with status ' + xml.status))
      };
    }
    else {
     
      return callback(new Error('Request failed with status ' + xml.status))
    };
  };

  xml.onerror = function (e) {
    callback(new Error(`Request failed due to an error: ${e}`))
  };

  xml.open('GET', url, true);
  xml.send();

};

getData(API_URL, function (error, data) {
  if (error) {
    return console.error('Error' + ' ' + error)
  };
  
  console.log('Primer Llamado...');

  getData(API_URL + data.results[0].id, function (error2, f) {
   
    if (error2) return console.error('Error2' + ' ' + error2);
    
    console.log('Segundo Llamado...');
    
    getData(f.origin.url, function (error3, h) {
      if (error3) return console.error('Error' + ' ' + error3);
      console.log('Tercer Llamado...');
      console.log('Personajes:' + ' ' + data.info.count);
      console.log('Primer Personaje:' + ' ' + f.name);
      console.log('Dimensión:' + ' ' + h.dimension);
    
    });
  });
});
