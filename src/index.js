var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const A = 'https://rickandmortyapi.com/api/character/'
const B = new XMLHttpRequest()

const X = (a) => {
    return new Promise((res, rej) => {
        B.onreadystatechange = () => {
            if (B.readyState == 4) {
                if (B.status === 200) res(B.responseText)
                else rej(B.status)
            }
        }
        B.open('GET', a, false)
        B.send()
    })
}

X(A)
    .then((response) => {
        console.log('Primer Llamado...')
        const characters = JSON.parse(response).info.count
        const firstCharacterId = JSON.parse(response).results[0].id
        return X(A + firstCharacterId).then((response) => ({
            response,
            characters
        }))
    })
    .then(({ response, characters }) => {
        console.log('Segundo Llamado...')
        const characterDetail = JSON.parse(response)
        return X(characterDetail.origin.url).then((originResponse) => ({
            characterDetail,
            originResponse,
            characters
        }))
    })
    .then(({ characterDetail, originResponse, characters }) => {
        console.log('Tercer Llamado...')
        const origin = JSON.parse(originResponse)
        console.log(`Personajes: ${characters}`)
        console.log(`Primer Personaje: ${characterDetail.name}`)
        console.log(`Dimensión: ${origin.dimension}`)
    })
    .catch((error) => {
        console.error(error)
    })