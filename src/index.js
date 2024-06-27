const API = 'https://rickandmortyapi.com/api/character/';

/**
 * 
 * @param {string} url_api - API URL
 * @param {void} callback - Callback function
 * @returns {Promise<string>} - Return data
 */
const fetchData = async (url_api, callback) => {
  const response = await fetch(url_api); // Fetch API
  const data = await response.text(); // Get data

  callback(data); // Call callback function

  return data; // Return data
}


/**
 * main function to get data from API
 */
const main = async () => {
  try {
    const data1 = await fetchData(API, () => {
      console.log('Primer Llamado...');
    });

    const data2 = await fetchData(API + JSON.parse(data1).results[0].id, () => {
      console.log('Segundo Llamado...');
    });

    const data3 = await fetchData(JSON.parse(data2).origin.url, () => {
      console.log('Tercer Llamado...');
    });

    console.log(`Personajes: ${JSON.parse(data1).info.count}`);
    console.log(`Primer Personaje: ${JSON.parse(data2).name}`);
    console.log(`Dimensión: ${JSON.parse(data3).dimension}`);

  } catch (error) {
    console.error(`Error ${error}`); // Error handling message
  }
}

main(); // Call main function