export default class RequestError extends Error {
    constructor(status: number){
        super()
        this.message = `Request failed with status ${status}`
    }
}