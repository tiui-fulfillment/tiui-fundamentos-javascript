const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) =>{
    return new Promise ((resolve, reject) =>{
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () =>{
            if (xhttp.readyState === 4){
                if (xhttp.status === 200){
                  try{
                    const response = JSON.parse(xhttp.responseText);
                    resolve(response);
                  } catch (e){
                    reject(e);
                  }
                }else{
                    reject(new Error(`Error ${xhttp.status}`));
                }
            }
        
        };
        xhttp.open('GET', url_api, true);
        xhttp.send();
    });
};

const main = async () => {
    try {
      console.log('Primer Llamado...');
      const data1 = await fetchData(API);
      const characterId = data1.results[0].id;
  
      console.log('Segundo Llamado...');
      const data2 = await fetchData(`${API}${characterId}`);
      const originUrl = data2.origin.url;
  
      console.log('Tercer Llamado...');
      const data3 = await fetchData(originUrl);
  
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  main();