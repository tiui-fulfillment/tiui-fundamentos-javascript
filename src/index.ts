const NodeXMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  };
  results: Character[];
}

interface Origin {
  dimension: string;
  residents: string[];
}

const A = "https://rickandmortyapi.com/api/character/";

const X = (a: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const B = new NodeXMLHttpRequest();
    B.onreadystatechange = () => {
      if (B.readyState === 4) {
        if (B.status === 200) {
          resolve(B.responseText);
        } else {
          reject(`Error: ${B.status}`);
        }
      }
    };
    B.open("GET", a, true);
    B.send();
  });
};

const parseJSON = <T>(response: string): T => {
  try {
    return JSON.parse(response);
  } catch (err) {
    throw new Error(`Error en JSON: ${err}`);
  }
};

const main = async () => {
  try {
    const d = await X(A);
    console.log(`Primer Llamado... ${d}`);

    const data: ApiResponse = parseJSON<ApiResponse>(d);
    console.log("Parsed data: ", data);

    if (!data.results || data.results.length === 0) {
      throw new Error("Sin resultados");
    }

    const f = await X(`${A}${data.results[0].id}`);
    console.log(`Segundo Llamado... ${f}`);

    const character: Character = parseJSON<Character>(f);

    const h = await X(character.origin.url);
    console.log("Tercer Llamado...");

    const originData: Origin = parseJSON<Origin>(h);

    console.log(`Personajes: ${originData.residents.length}`);
    console.log(`Primer Personaje: ${character.name}`);
    console.log(`Dimensión: ${originData.dimension}`);
  } catch (err) {
    console.error(err);
  }
};

main();
