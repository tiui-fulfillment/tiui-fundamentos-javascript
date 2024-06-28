/* Estoy batallando usar XMLHttpRequest con typescript ya que no es muy común, por ahora mando la
solución con fetch y TypeScript */

// import { XMLHttpRequest } from "xmlhttprequest";

// /* Me tomare el atrevimiento de cambiar las variables de nombre, el usar variables sin contexto
// dificulta la lectura del código */
 const GLOBAL_URL: string = 'https://rickandmortyapi.com/api/character/';
// const xhttp = new XMLHttpRequest();

// type Callback = (error: string | null, response?: any) => void;

// //- 1 Primer problema
// function get_data(_URL: string, callback: Callback): void {
//   xhttp.onreadystatechange = function () {
//     /* 2.- La comparacion estricta === evitaba pasar del status 200,
//      de todos modos los estatus son númericos por lo tanto los devuelvo a esa forma */
//     if (xhttp.readyState === 4) {
//       if (xhttp.status === 200) {
//         return callback(null, JSON.parse(xhttp.responseText)); 
//       }
//       else return callback(_URL+' not 200');
//     }
//     else return callback(_URL+' not 4');
//   };
//   xhttp.open('GET', _URL, false);
//   xhttp.send();
// }

// console.log([...Array(60).keys()].reduce((line, el) => line+'-',''))

// //- 1 Primer problema
// /* 1.- Para debuggear me doy cuenta que ni siquiera pasa el Primer llamado, 
// por lo tanto el primer error debe estar en el primer error debe estar en el primer if */
// get_data(URL, function (url_error_1, response_1) {
//   if (url_error_1) return console.error('Error' + ' ' + url_error_1);
//   console.log('Primer Llamado...');
//   /* 3.- El formato texto plano no coincidia con lo que consultaba results,
//   por lo que lo convertí a objeto JSON */
//   get_data(URL + response_1.results[0].id, function (url_error_2, response_2) {
//     if (url_error_2) return console.error('Error' + ' ' + url_error_2);
//     console.log('Segundo Llamado...');
//     get_data(response_2.origin.url, function (url_error_3, response_3) {
//       if (url_error_3) return console.error('Error' + ' ' + url_error_3);
//       console.log('Tercer Llamado...');
//       /* 4.- Quite todos lo JSON.Parse de aquí por que la respuesta siempre se consultó como objeto,
//       lo hago desde la función compartida donde se obtienen los datos: get_data */
//       console.log('Personajes:' + ' ' + response_1.info.count);
//       console.log('Primer Personaje:' + ' ' + response_2.name);
//       console.log('Dimensión:' + ' ' + response_3.dimension);
//     });
//   });
// });

// console.log([...Array(60).keys()].reduce((line, el) => line+'-',''))

// //-- 2 Segundo Problema
// const get_dataES6 = (_URL: string, callback: Callback): void => {
//   xhttp.onreadystatechange = () => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status === 200) {
//         return callback(null, JSON.parse(xhttp.responseText)); 
//       }
//       else return callback(`${_URL} not 200`);
//     }
//     else return callback(`${_URL} not 4`);
//   };
//   xhttp.open(`GET`, _URL, false);
//   xhttp.send();
// }

// //-- 2 Segundo Problema
// get_dataES6(URL, (url_error_1, response_1) => {
//   if (url_error_1) return console.error(`Error ${url_error_1}`);
//   console.log(`Primer Llamado... Segundo problema`);
//   get_data(`${URL}${response_1.results[0].id}`, (url_error_2, response_2) => {
//     if (url_error_2) return console.error(`Error ${url_error_2}`);
//     console.log(`Segundo Llamado... Segundo problema`);
//     get_data(response_2.origin.url, (url_error_3, response_3) => {
//       if (url_error_3) return console.error(`Error ${url_error_3}`);
//       console.log(`Tercer Llamado... Segundo problema`);
//       console.log(`Personajes: ${response_1.info.count}`);
//       console.log(`Primer Personaje: ${response_2.name}`);
//       console.log(`Dimensión: ${response_3.dimension}`);
//     });
//   });
// });

console.log([...Array(60).keys()].reduce((line, el) => line+'-',''))

//--- 3 Tercer y cuarto Problema, Opcional Agregar TypeScript
const get_data_w_promise = async (_URL: string): Promise<any> => {
  try {
    const response = await fetch(_URL);
    if (!response.ok) {
      throw new Error(`${_URL} not 200`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

const get_data_w_promises = async (): Promise<void> => {
  const response_1: any = await get_data_w_promise(GLOBAL_URL).catch(error => console.error('Error:', error));
  console.log(`Primer Llamado... Opcional con TypeScript`);
  const response_2: any = await get_data_w_promise(`${GLOBAL_URL}${response_1.results[0].id}`);
  console.log(`Segundo Llamado... Opcional con TypeScript`);
  const response_3: any = await get_data_w_promise(response_2.origin.url);
  console.log(`Tercer Llamado... Opcional con TypeScript`);
  console.log(`Personajes: ${response_1.info.count}`);
  console.log(`Primer Personaje: ${response_2.name}`);
  console.log(`Dimensión: ${response_3.dimension}`);
};

get_data_w_promises();