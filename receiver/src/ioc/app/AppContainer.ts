import { Container } from "inversify"
import AppTypes from "./AppTypes"
import AuthService from "./auth/AuthService"
import ImplAuthService from "./auth/impl/ImplAuthService"
import DataService from "./data/DataService"
import FsDataService from "./data/fs/FsDataService"
import ImplPermissionService from "./permission/impl/ImplPermissionService"
import PermissionService from "./permission/PermissionService"

// bind
const appContainer = new Container()
appContainer
  .bind<AuthService>(AppTypes.AUTH)
  .to(ImplAuthService)
  .inSingletonScope()
appContainer
  .bind<DataService>(AppTypes.DATA)
  .to(FsDataService)
  .inSingletonScope()
appContainer
  .bind<PermissionService>(AppTypes.PERMISSION)
  .to(ImplPermissionService)
  .inRequestScope()

// export
export default appContainer
