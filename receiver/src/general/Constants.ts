export class Constants {
  public static version = 3

  private static mainPath: string | null = null
  public static getMainPath(): string {
    let mainPath = Constants.mainPath
    if (mainPath == null) {
      mainPath = require("../../MainPath")
      Constants.mainPath = mainPath
      return mainPath || "./"
    } else {
      return mainPath
    }
  }
}
