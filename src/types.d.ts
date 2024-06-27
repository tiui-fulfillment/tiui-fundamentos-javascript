/*
NOTA: Aqui estoy definiendo solo lo que se utiliza pero lo ideal seria 
definir todo el response de las api`s de Rick and Morty
*/

interface APIResponse {
  info: {
    count: number;
  };
  results: Character[];
}

interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

interface Origin {
  dimension: string;
}

export {
  APIResponse,
  Character,
  Origin
}