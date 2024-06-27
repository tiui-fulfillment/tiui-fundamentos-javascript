export type Characters = {
    info: info
    results: Character[]
}



export type Character = {
    id: number,
    name: string,
    origin: origin,

}

export type Location = {
    id: number,
    name: string,
    type: string,
    dimension: string
    residents: string[]
}

type info = {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null
}

type origin = {
    name: string,
    url: string,
}