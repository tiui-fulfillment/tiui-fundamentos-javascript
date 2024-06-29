const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} 
				else {
					reject(`Error: ${xhr.status}`);
				}
			}
		};
		xhr.open('GET', url, true);
		xhr.send();
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
	} 
	catch (error) {
		console.error(`Error en la secuencia de llamadas: ${error}`);
	}
};

main();