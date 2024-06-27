
/* Adicional codigo convertido a typescript */

import { XMLHttpRequest } from "xmlhttprequest";
const A: string = "https://rickandmortyapi.com/api/character/";

interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

interface ApiResponse<T> {
  results: T[];
  info: {
    count: number;
  };
}

const X = (a: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const B = new XMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(JSON.parse(B.responseText));
        } else {
          reject(`HTTP error: ${B.status}`);
        }
      }
    };
    B.open("GET", a, true);
    B.send();
  });
};

const fetchCharacterData = async (): Promise<void> => {
  try {
    const d: ApiResponse<Character> = await X(A);
    console.log("Primer Llamado...");

    if (d.results && d.results.length > 0) {
      const f: Character = await X(`${A}${d.results[0].id}`);
      console.log("Segundo Llamado...");

      const h: any = await X(f.origin.url);
      console.log("Tercer Llamado...");

      console.log(`Personajes: ${d.info.count}`);
      console.log(`Primer Personaje: ${f.name}`);
      console.log(`Dimensión: ${h.dimension}`);
    } else {
      console.error('No results found');
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

fetchCharacterData();
