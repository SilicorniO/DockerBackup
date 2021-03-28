import { Request } from "express"

export class ControllerRequest {
  // express request
  public request: Request

  constructor(request: Request) {
    this.request = request
  }
}
