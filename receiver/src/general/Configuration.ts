import * as Fs from "fs"
import { Constants } from "./Constants"
import { Log } from "./Log"

export interface IConfigurationDatabase {
  address: string
  port: number
  name: string
  user: string
  password: string
}

export interface IConfigurationPermission {
  secret: string
  maxTime: number
  maxSize: number
  numMin: number
}

export interface IConfiguration {
  debug: boolean
  listenPort: number
  permission: IConfigurationPermission
  backupsFolder: string
  domainsWhiteList: string[]
}

export class Configuration {
  private static configuration: any | null = null

  public static get(): IConfiguration {
    const conf = Configuration.configuration
    if (conf == null) {
      // get environment values
      const confEnvironmentFile = Fs.readFileSync(
        Constants.getMainPath() + "/configuration.json",
        "utf8",
      )
      const confEnvironment = JSON.parse(confEnvironmentFile)
      Log.do("confEnvironment", confEnvironment)

      // apply env values
      if (process.env.SECRET) {
        confEnvironment.permission.secret = process.env.SECRET
      }

      // merge objects
      Configuration.configuration = confEnvironment
      return confEnvironment
    } else {
      return conf
    }
  }
}
