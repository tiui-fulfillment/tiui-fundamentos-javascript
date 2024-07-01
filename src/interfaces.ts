export interface Character{
    id:number,
    name: string,
    origin: {
        url: string
    }
}

export interface CharactersList{
    info: {
        count: number
    },
    results: Character[]
}

export interface Dimension{
    dimension: string
}