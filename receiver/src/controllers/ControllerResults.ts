import { Log } from "../general/Log"
import { Response } from "express"

export class ControllerResults {
  public static ok(res: Response, result: any) {
    res.status(200)
    if (result && typeof result !== "boolean") {
      // check if it is a file
      if (Buffer.isBuffer(result)) {
        res.status(200)
        res.setHeader("Content-Type", "image/jpeg")
        res.setHeader("Content-Length", result.length)
        res.write(result, "binary")
        res.end()
        return
      }

      Log.i(">>>>>>> RETURN 200")
      // Log.d(JSON.stringify(result, null, 2))
      res.send(result)
    } else {
      Log.i(">>>>>>> RETURN 200 (EMPTY)")
      res.send()
    }
  }

  public static okAdded(res: any, result: any) {
    Log.i(">>>>>>> RETURN 201")
    // Log.d(JSON.stringify(result, null, 2))
    res.status("201")
    res.send(result)
  }

  public static error(res: Response, err: string) {
    const errCode = ControllerResults.getErrCode(err)
    Log.i(">>>>>>> RETURN 400[" + errCode + "]: " + err)
    res.status(400)
    res.send('{"code":"' + errCode + '","message":"' + err + '"}')
  }

  public static errorBadRequest(res: Response, err: string) {
    const errCode = ControllerResults.getErrCode(err)
    Log.i(">>>>>>> RETURN 400 badRequest[" + errCode + "]: " + err)
    res.status(400)
    res.send('{"code":"' + errCode + '","message":"' + err + '"}')
  }

  public static errorTermsAndConditions(res: Response) {
    Log.i(">>>>>>> RETURN 401 unhautorized")
    res.status(401)
  }

  public static errorUnauthorized(res: Response, err: string | null = null) {
    res.status(401)
    if (err != null) {
      const errCode = ControllerResults.getErrCode(err)
      Log.i(">>>>>>> RETURN 401[" + errCode + "]: " + err)
      res.send()
    } else {
      Log.i(">>>>>>> RETURN 401 unhautorized")
      res.send()
    }
  }

  private static getErrCode(code: string | null): string {
    if (code == null || !code.startsWith("E-")) {
      return "E-00-000"
    } else {
      return code
    }
  }
}
