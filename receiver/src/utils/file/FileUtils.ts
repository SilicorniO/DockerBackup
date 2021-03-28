import * as Fs from "fs"
import { Log } from "general/Log"

export class FileUtils {
  public static saveBytesIntoFile(
    filePath: string,
    data: any,
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      try {
        Log.d("filePath:" + filePath)
        Fs.writeFile(filePath, data, "binary", (errno) => {
          if (errno != null) {
            Log.e(`Error saving bytes into file: ${errno}`)
            resolve(false)
            return
          }

          resolve(true)
        })
      } catch (e) {
        Log.e(`Exception converting data to file: ${e}`)
        resolve(false)
      }
    })
  }

  public static folderExists(folderPath: string): boolean {
    return Fs.existsSync(folderPath)
  }

  public static createFolder(folderPath: string) {
    Fs.mkdirSync(folderPath)
  }

  public static getFile(filePath: string): Buffer | null {
    try {
      return Fs.readFileSync(filePath)
    } catch (e) {
      Log.e("Exception getting file: " + filePath)
      return null
    }
  }

  public static getFilesizeInBytes(filePath: string): Promise<number | null> {
    return new Promise((resolve) => {
      Fs.stat(filePath, (errno, stats) => {
        if (stats) {
          resolve(stats.size)
        } else if (errno != null) {
          Log.e(`errno.message`)
          resolve(null)
        } else {
          Log.e("Error getting size of file")
          resolve(null)
        }
      })
    })
  }

  public static getFileDateUpdate(filePath: string): Date {
    const stats = Fs.statSync(filePath)
    return stats.mtime
  }

  public static copyFile(srcPath: string, dstPath: string): boolean {
    try {
      // copy the file
      Fs.createReadStream(srcPath).pipe(Fs.createWriteStream(dstPath))
      return true
    } catch (e) {
      Log.e("Exception generating original scale: " + e)
    }
    return false
  }

  public static deleteFile(path: string): boolean {
    try {
      // remove the file
      Fs.unlinkSync(path)
      return true
    } catch (e) {
      Log.e("Exception deleting file " + path + ": " + e)
    }
    return false
  }
}
