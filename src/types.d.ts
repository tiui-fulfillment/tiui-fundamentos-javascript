export interface ApiUrlResponse {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string | null
    },
    results: Character[]
}

interface BasicData {
    id: number
    name: string
    type: string
    created: ReturnType<typeof Date.now>
}
export interface Character extends BasicData{
    status: string
    gender: string
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
    image: string
    episode: string[]
    url: string
   
}

export interface Location extends BasicData {
    dimension: string
    residents: string[]
    url: string
}