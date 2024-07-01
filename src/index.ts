import { ApiResponse, Character, CharacterLocation, OriginResponse } from "./types";

const baseUrl: string = "https://rickandmortyapi.com/api/character/";

async function sendRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed');
  }
  return response.json();
}

async function printResults() {
  try {
    const firstCall: ApiResponse = await sendRequest<ApiResponse>(baseUrl);
    console.log('Primer llamado');

    const secondCall: Character = await sendRequest<Character>(`${baseUrl}${firstCall.results[0].id}`);
    console.log('Segundo llamado');

    const thirdCall: CharacterLocation = await sendRequest<CharacterLocation>(secondCall.origin.url);
    console.log('Tercer llamado');

    console.log('Personajes: ' + firstCall.info.count);
    console.log('Primer Personaje: ' + secondCall.name);
    console.log('Dimensión: ' + thirdCall.dimension);
  } catch (error) {
    console.error('Request failed', error);
  }
}

printResults();
