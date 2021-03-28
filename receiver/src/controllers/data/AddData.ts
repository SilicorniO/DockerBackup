import { BaseController, BaseControllerConf } from "controllers/BaseController"
import { ControllerRequest } from "controllers/ControllerRequest"
import appContainer from "ioc/app/AppContainer"
import AppTypes from "ioc/app/AppTypes"
import DataService from "ioc/app/data/DataService"
import DataFile from "ioc/app/data/model/DataFile"
import LoggedUser from "model/app/LoggedUser"
import UserLevel from "model/app/UserLevel"
import multer = require("multer")

export default class AddData implements BaseController {
  private dataService: DataService = appContainer.get(AppTypes.DATA)

  public getConf(): BaseControllerConf {
    return {
      type: "PUT",
      path: "/data",
      userLevel: UserLevel.USER,
      uploadType: multer().any(),
    }
  }

  public async execute(
    req: ControllerRequest,
    userLogged: LoggedUser,
  ): Promise<void> {
    // convert from multer files to data files
    const files = (req.request as any).files as Express.Multer.File[]
    const dataFiles = files.map<DataFile>((file) => {
      return {
        name: file.fieldname,
        data: file.buffer,
      }
    })

    // store data
    await this.dataService.addFiles(dataFiles)

    // clean files
    await this.dataService.cleanFiles()
  }
}
