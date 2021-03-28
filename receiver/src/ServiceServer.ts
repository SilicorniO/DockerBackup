import { Log } from "general/Log"
import { Application, Request, Response } from "express"
import express = require("express")
import * as http from "http"
import * as cors from "cors"
import { Configuration } from "general/Configuration"
import AppTypes from "ioc/app/AppTypes"
import AuthService from "ioc/app/auth/AuthService"
import appContainer from "ioc/app/AppContainer"
import { ControllerRequest } from "controllers/ControllerRequest"
import {
  BaseController,
  BaseControllerError,
  BaseControllerErrorType,
} from "controllers/BaseController"
import { ControllerResults } from "controllers/ControllerResults"
import DateUtils from "utils/date/DateUtils"

export default class ServiceServer {
  private authService: AuthService = appContainer.get(AppTypes.AUTH)

  private application: Application
  private server: any

  constructor() {
    // tinitialize express
    this.application = express()

    // configure
    this.configure(this.application)
  }

  private configure(application: Application) {
    this.configureExpressBodyParser(application)
    this.configureExpressLogs(application)
    this.configureExpressCors(application)
  }

  private configureExpressBodyParser(application: Application) {
    application.use(express.urlencoded())
    application.use(express.json())
  }

  private configureExpressLogs(application: Application) {
    application.use((req: Request, res: Response, next: () => void) => {
      if (req.method !== "OPTIONS") {
        Log.i(`${req.ip} ==== ${req.method} ===> ${req.originalUrl}`)
        if (
          req.headers["content-type"] != null &&
          req.body != null &&
          !req.headers["content-type"].startsWith("image/") &&
          Object.keys(req.body).length > 0
        ) {
          Log.i("BODY REQUEST: " + JSON.stringify(req.body))
        }
      }

      next()
    })
  }

  private configureExpressCors(application: Application) {
    // cors white list for working in localhost
    const corsOptions = {
      origin: (origin, cb) => {
        const originIsWhitelisted =
          Configuration.get().domainsWhiteList.indexOf(origin) !== -1
        cb(null, originIsWhitelisted)
      },
      credentials: true,
    }
    application.use(cors(corsOptions))
  }

  public createServer() {
    // create server
    this.server = http.createServer(this.application)
  }

  public addServices(services: BaseController[]) {
    // add all services
    for (const service of services) {
      this.addService(service)
    }
  }

  public addService(service: BaseController) {
    // get service configuration
    const conf = service.getConf()

    // generate a custom callback to pass loginManager before calling
    const cb = async (req: Request, res: Response) => {
      const headers = await this.authService.getAuthHeaders(req)
      const userLogged = await this.authService.getLoggedUser(headers)
      Log.d(`UserLogged: ${userLogged.level}`)

      // check any error
      if (userLogged.level < conf.userLevel) {
        ControllerResults.errorUnauthorized(res, "E-00-001")
        return
      }

      // convert request to ControllerRequest
      const serviceReq = new ControllerRequest(req)

      // execute the service
      try {
        const result = await service.execute(serviceReq, userLogged)
        ControllerResults.ok(res, result)
      } catch (error) {
        if (error instanceof BaseControllerError) {
          const baseServiceError: BaseControllerError = error
          if (baseServiceError.type === BaseControllerErrorType.UNAUTHORIZED) {
            ControllerResults.errorUnauthorized(res, error.message)
          } else if (
            baseServiceError.type === BaseControllerErrorType.BAD_REQUEST
          ) {
            ControllerResults.errorBadRequest(res, error.message)
          } else {
            ControllerResults.error(res, error.message)
          }
        } else {
          Log.e(`Error: ${error}`)
          ControllerResults.error(res, error.code)
        }
      }
    }

    if (conf.type === "GET") {
      this.application.get(conf.path, conf.uploadType, cb)
    } else if (conf.type === "POST") {
      this.application.post(conf.path, conf.uploadType, cb)
    } else if (conf.type === "PUT") {
      this.application.put(conf.path, conf.uploadType, cb)
    } else if (conf.type === "DELETE") {
      this.application.delete(conf.path, conf.uploadType, cb)
    }
  }

  public run() {
    // check server is not null
    if (this.server == null) {
      Log.e(
        "Excecution stopped because server was not created correctly, check configuration",
      )
      return
    }

    // define date transformation
    Date.prototype.toJSON = function () {
      return DateUtils.dateToString(this, DateUtils.FORMAT_ZZZZ)
    }

    // listen services
    this.server.listen(Configuration.get().listenPort, () => {
      Log.i("Listening on port " + Configuration.get().listenPort + "!")
    })
  }
}
