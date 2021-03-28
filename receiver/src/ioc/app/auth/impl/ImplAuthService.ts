import { Request } from "express"
import { injectable } from "inversify"
import appContainer from "ioc/app/AppContainer"
import AppTypes from "ioc/app/AppTypes"
import PermissionService from "ioc/app/permission/PermissionService"
import LoggedUser from "model/app/LoggedUser"
import UserLevel from "model/app/UserLevel"
import AuthService from "../AuthService"
import AuthHeaders from "../model/AuthHeaders"

@injectable()
export default class ImplAuthService implements AuthService {
  private permissionService: PermissionService = appContainer.get(
    AppTypes.PERMISSION,
  )

  public getAuthHeaders(req: Request): AuthHeaders {
    return {
      authorization: req.header("Authorization") || "",
    }
  }

  public async getLoggedUser(headers: AuthHeaders): Promise<LoggedUser> {
    // validate token
    if (!this.permissionService.validate(headers.authorization)) {
      return {
        level: UserLevel.ANYONE,
      }
    }

    // get logged user
    return {
      level: UserLevel.USER,
    }
  }
}
