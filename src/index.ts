const axios = require('axios')
import {AxiosResponse} from 'axios'
import {Character, CharactersList, Dimension} from './interfaces'

const apiUrl: string = `https://rickandmortyapi.com/api/character/`;

const getData = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url)
  return response.data
}

const getCharacterData = async (): Promise<void> => {
  try {
    console.log('Primera llamada...')
    const personajesData: CharactersList = await getData(apiUrl)

    console.log('Segunda llamada...')
    const primerPersonajeData: Character = await getData(`${apiUrl}${personajesData.results[0].id}`)
    console.log(primerPersonajeData)

    console.log('Tercer llamada')
    const dimensionData: Dimension = await getData(primerPersonajeData.origin.url)

    console.log(`Personajes: ${personajesData.info.count}`)
    console.log(`Primer personaje: ${primerPersonajeData.name}`)
    console.log(`Dimension: ${dimensionData.dimension}`)
  } catch (error: any) {
    console.log(`Error: ${error.message}`)
  }
}
// function X(a, b) {
//   B.onreadystatechange = function (e) {
//     if (B.readyState == '4') {
//       if (B.status === '200')
//         b(null, B.responseText);
//       else return b(a);
//     }
//     else return b(a);
//   };
//   B.open('GET', a, false);
//   B.send();
// };

getCharacterData()
