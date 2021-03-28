import Controllers from "controllers/Controllers"
import { Configuration } from "general/Configuration"
import { Log } from "general/Log"
import ServiceServer from "ServiceServer"

// configure logs
Log.showLogs = true
Log.showLogsDebug = Configuration.get().debug
Log.i("----- SERVER START -----")

class ServerStart {
  static instance: ServerStart = new ServerStart()

  private serviceServer = new ServiceServer()

  async run() {
    // start server and load controllers
    this.serviceServer.createServer()
    this.serviceServer.addServices(Controllers.get())
    this.serviceServer.run()

    // initialize server
    Log.i("----- SERVER END -----")
  }
}

export default ServerStart.instance.run()
