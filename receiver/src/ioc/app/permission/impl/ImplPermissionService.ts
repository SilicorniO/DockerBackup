import { Configuration } from "general/Configuration"
import { injectable } from "inversify"
import PermissionService from "../PermissionService"

@injectable()
export default class ImplPermissionService implements PermissionService {
  public validate(authorization: string): boolean {
    // check in permissions
    return authorization == Configuration.get().permission.secret
  }

  public validateUser(authorization: string): string | null {
    // check in permissions
    const user = Configuration.get().permission.users.find(
      (user) => user.secret == authorization,
    )
    if (user == null) {
      return null
    }

    return user.name
  }
}
