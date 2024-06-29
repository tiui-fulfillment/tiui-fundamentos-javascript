// Definición de los tipos de datos utilizados en las respuestas de la API de Rick and Morty

export interface APIResponse {
  info: {
    count: number;
  };
  results: Character[];
}

export interface Character {
  id: number;
  name: string;
  origin: {
    url: string;
  };
}

export interface Origin {
  dimension: string;
}
