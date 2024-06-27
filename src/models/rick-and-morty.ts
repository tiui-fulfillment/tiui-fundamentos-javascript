export interface RickAndMorty {
    info?:    Info;
    results?: Result[];
}

export interface Info {
    count?: number;
    pages?: number;
    next?:  string;
    prev?:  null;
}

export interface Result {
    id?:       number;
    name?:     string;
    status?:   Status;
    species?:  Species;
    type?:     string;
    gender?:   Gender;
    origin?:   Location;
    location?: Location;
    image?:    string;
    episode?:  string[];
    url?:      string;
    created?:  Date;
}

export type Gender = "Male" | "Female" | "unknown";

export interface Location {
    id?:        number;
    name?:      string;
    type?:      string;
    dimension?: string;
    residents?: string[];
    url?:       string;
    created?:   Date;
}

export type Species = "Human" | "Alien";

export type Status = "Alive" | "unknown" | "Dead";
