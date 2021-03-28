import { RequestHandler } from "express"
import LoggedUser from "model/app/LoggedUser"
import { ControllerRequest } from "./ControllerRequest"

export enum BaseControllerErrorType {
  UNAUTHORIZED,
  BAD_REQUEST,
  ERROR,
}

export class BaseControllerError {
  public readonly type: BaseControllerErrorType
  public readonly message: string

  private constructor(type: BaseControllerErrorType, message: string) {
    this.type = type
    this.message = message
  }

  public static generateUnauthorized(): BaseControllerError {
    return new BaseControllerError(BaseControllerErrorType.UNAUTHORIZED, "")
  }

  public static generateBadRequest(
    message: string | Error,
  ): BaseControllerError {
    return new BaseControllerError(
      BaseControllerErrorType.BAD_REQUEST,
      message instanceof Error ? message.toString() : message,
    )
  }

  public static generateError(message: string | Error): BaseControllerError {
    return new BaseControllerError(
      BaseControllerErrorType.ERROR,
      message instanceof Error ? message.toString() : message,
    )
  }
}

export interface BaseControllerConf {
  type: string
  path: string
  userLevel: number
  uploadType: RequestHandler
}

export interface BaseController {
  getConf(): BaseControllerConf
  execute(req: ControllerRequest, userLogged: LoggedUser): Promise<any | null>
}
