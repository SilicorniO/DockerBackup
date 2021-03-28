import { Request } from "express"
import LoggedUser from "model/app/LoggedUser"
import AuthHeaders from "./model/AuthHeaders"

export default interface AuthService {
  getAuthHeaders(req: Request): AuthHeaders
  getLoggedUser(headers: AuthHeaders): Promise<LoggedUser>
}
