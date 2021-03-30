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

export interface IConfigurationUser {
  name: string
  secret: string
}

export interface IConfigurationPermission {
  secret: string
  users: IConfigurationUser[]
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
      if (process.env.USERS) {
        // generate users
        const users: IConfigurationUser[] = []
        const usersSplit = process.env.USERS.split(";")
        for (const userSplit of usersSplit) {
          const userComponents = userSplit.split(":")
          if (userComponents.length > 1) {
            users.push({
              name: userComponents[0],
              secret: userComponents[1],
            })
          }
        }

        // assign users
        confEnvironment.permission.users = users
      }
      if (process.env.SECRET) {
        confEnvironment.permission.secret = process.env.SECRET
      }
      if (process.env.MAX_TIME) {
        confEnvironment.permission.maxTime = process.env.MAX_TIME
      }
      if (process.env.MAX_SIZE) {
        confEnvironment.permission.maxSize = process.env.MAX_SIZE
      }
      if (process.env.NUM_MIN) {
        confEnvironment.permission.numMin = process.env.NUM_MIN
      }

      // merge objects
      Configuration.configuration = confEnvironment
      return confEnvironment
    } else {
      return conf
    }
  }
}
