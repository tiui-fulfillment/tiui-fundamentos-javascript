import fetch from 'node-fetch';

const A = 'https://rickandmortyapi.com/api/character/';

const fetchData = async (url) => {

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data
        // return console.log(data); // Devuelve los datos obtenidos
      } catch (error) {
        throw new Error(`Fetch error: ${error.message}`);
      }
};


const rickInformation = async () => {
  try {
    console.log('Primer Llamado...');
    const data = await fetchData(A);
    console.log('Personajes: ' + data.info.count);

    console.log('Segundo Llamado...');
    const character = await fetchData(`${A}${data.results[0].id}`);
    console.log('Primer Personaje: ' + character.name);

    console.log('Tercer Llamado...');
    const origin = await fetchData(character.origin.url);
    console.log('Dimensión: ' + origin.dimension);

  } catch (error) {
    console.error('Error: ' + error.message);
  }
};

rickInformation();
