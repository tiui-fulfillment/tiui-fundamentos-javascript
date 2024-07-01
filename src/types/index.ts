export interface ApiResponse {
    info: Info;
    results: Character[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginResponse;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface OriginResponse {
    name: string;
    url: string;
}

export interface CharacterLocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}