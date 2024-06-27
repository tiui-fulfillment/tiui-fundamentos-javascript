import axios from 'axios';

import { CharactersResponse, CharacterDetail, Origin } from './interfaces/character.interface';


const A = 'https://rickandmortyapi.com/api/character/';

const X = (a: string): Promise<any> => {
    return new Promise((res, rej) => {
        axios.get(a)
            .then(response => {
                res(response.data);
            })
            .catch(error => {
                rej(error.response ? error.response.status : error.message);
            });
    });
}

X(A)
    .then((response: CharactersResponse) => {
        console.log('Primer Llamado...');
        const characters = response.info.count;
        const firstCharacterId = response.results[0].id;
        return X(A + firstCharacterId).then((response: CharacterDetail) => ({
            response,
            characters
        }));
    })
    .then(({ response, characters }: { response: CharacterDetail; characters: number }) => {
        console.log('Segundo Llamado...');
        const characterDetail = response;
        return X(characterDetail.origin.url).then((originResponse: Origin) => ({
            characterDetail,
            originResponse,
            characters
        }));
    })
    .then(({ characterDetail, originResponse, characters }: { characterDetail: CharacterDetail; originResponse: Origin; characters: number }) => {
        console.log('Tercer Llamado...');
        const origin = originResponse;
        console.log(`Personajes: ${characters}`);
        console.log(`Primer Personaje: ${characterDetail.name}`);
        console.log(`Dimensión: ${origin.dimension}`);
    })
    .catch((error) => {
        console.error(error);
    });
