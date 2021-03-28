export class Log {
  private static SHOW_STACK_LINE: boolean = true
  private static SHOW_DATE: boolean = true

  public static showLogs: boolean = false
  public static showLogsDebug: boolean = false

  public static d(text: string) {
    if (this.showLogsDebug) {
      this.log("DEBUG", text, false, null)
    }
  }

  public static do(text: string, obj: any) {
    if (this.showLogsDebug) {
      this.log("DEBUG-OBJ", text, true, obj)
    }
  }

  public static i(text: string) {
    this.log("INFO", text, false, null)
  }

  public static e(text: string) {
    this.log("ERROR", text, false, null)
  }

  private static log(level: string, text: string, objFlag: boolean, obj: any) {
    if (!this.showLogs) {
      return
    }

    // text to show
    let logText = ""

    // prepare date
    if (Log.SHOW_DATE) {
      logText = "[" + new Date().toISOString() + "]"
    }

    // add level
    logText += "[" + level + "]"

    // stack line
    if (objFlag && Log.SHOW_STACK_LINE) {
      logText += "[" + this.getStackLine() + "]"
    }

    // text
    logText += " " + text

    // show log
    // tslint:disable-next-line:no-console
    console.log(logText)

    // object
    if (objFlag) {
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(obj))
    }
  }

  private static getStackLine() {
    const err = new Error()

    if (!err.stack) {
      return ""
    }

    const lines = err.stack.split("\n")
    if (lines.length > 5) {
      const words = lines[4].trim().split(" ")
      if (words.length > 2) {
        return words[1]
      } else {
        return lines[4]
      }
    } else {
      return ""
    }
  }
}
