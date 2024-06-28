import { firstRequest, secondRequest, thirdRequest } from "./services/requests";
/**
* Main function that makes all the calls to other functions to retrieve data.
*/
const main = async () => {
  const firstResult: any = await firstRequest();
  console.log('Primer llamado...');
  const secondResult: any = await secondRequest(firstResult.results[0].id);
  console.log('Segundo llamado...');
  const thirdResult: any = await thirdRequest(secondResult.origin.url);
  console.log('Tercer llamado...');

  console.log(`Personajes: ${firstResult.info.count} `);
  console.log(`Primer Personaje: ${secondResult.name} `);
  console.log(`Dimensión: ${thirdResult.dimension} `);
}

main();
