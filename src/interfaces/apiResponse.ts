import { CharacterI } from "./character";

export interface ApiResponseI {
    info: {
        count: number;
    };
    results: CharacterI[];
}