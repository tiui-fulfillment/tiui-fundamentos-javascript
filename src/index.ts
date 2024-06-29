import { API_URL } from './constants/api.js'
import { fetcher } from './utils/fetcher.js'

import type {
  Characters,
  Character,
  Location
} from './interfaces/rick-and-morty-api/index.js'

// import { fetchData } from './utils/fetch-data.ts'
// Note: we are using the fetcher utility instead of the fetchData function because it is a more modern approach
// than using the XMLHttpRequest object directly. See fetchData.ts for an implementation using XMLHttpRequest.

const main = async () => {
  try {
    const characters = await fetcher<Characters>(API_URL, { method: 'GET' })
    console.log('Primer Llamado...')

    const firstCharacter = await fetcher<Character>(API_URL + characters.results[0].id, { method: 'GET' });
    console.log('Segundo Llamado...')

    const location = await fetcher<Location>(firstCharacter.origin.url, { method: 'GET' })
    console.log('Tercer Llamado...')

    console.log('\n')
    console.log(`Personajes: ${characters.info.count}`)
    console.log(`Primer Personaje: ${firstCharacter.name}`)
    console.log(`Dimensión: ${location.dimension}`)

  } catch (error) {
    console.error('Error', error)
  }
}

main()
  .then(() => console.log('Done'))
  .catch((err) => console.error('Error', err))
