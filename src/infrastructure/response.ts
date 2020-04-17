import {Response} from 'express';

export class ResponseSource {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    public static build(response: Response): ResponseSource {
        return new ResponseSource(response);
    }

    public sendOk(): ResponseSource {
        this.response.send('OK')
        return this;
    }
}