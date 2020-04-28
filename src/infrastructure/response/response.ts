import { Response } from "express";

export class ResponseSource {
  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  public static build(response: Response): ResponseSource {
    return new ResponseSource(response);
  }

  public Ok(object: any): ResponseSource {
    this.response.send(JSON.stringify(object));
    return this;
  }

  public Created(object: any): ResponseSource {
    this.response.statusCode = 201;
    this.response.send(JSON.stringify(object));
    return this;
  }
}
