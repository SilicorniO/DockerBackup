import { Configuration } from "general/Configuration"
import { Log } from "general/Log"
import { injectable } from "inversify"
import AppError from "ioc/app/AppError"
import DateUtils from "utils/date/DateUtils"
import { FileUtils } from "utils/file/FileUtils"
import DataService from "../DataService"
import DataFile from "../model/DataFile"
import FileDataManager from "./FileDataManager"

const MAX_TIME_UNIT = 1000 // seconds
const MAX_SIZE_UNIT = 1024 * 1024 // megabytes

@injectable()
export default class FsDataService implements DataService {
  private fileDataManager = new FileDataManager()

  public async addFiles(files: DataFile[]): Promise<void> {
    for (const file of files) {
      try {
        Log.d(`Adding ${file.name}`)
        // check if user folder exist, else we create it
        const backupsFolder = Configuration.get().backupsFolder
        if (!FileUtils.folderExists(backupsFolder)) {
          FileUtils.createFolder(backupsFolder)
        }

        // save the file
        const filePath = `${backupsFolder}/${file.name}`
        if (!(await FileUtils.saveBytesIntoFile(filePath, file.data))) {
          Log.d(`Error adding ${file.name}`)
        } else {
          Log.d(`Added ${file.name}`)
        }
      } catch (error) {
        Log.e(`Error adding file - ${file.name}: ${error}`)
        throw AppError.generate(`E-00-001`)
      }
    }
    return
  }

  public async cleanFiles(): Promise<void> {
    // permission values
    const permission = Configuration.get().permission

    // get folder info
    const backupFolder = Configuration.get().backupsFolder
    const folderInfo = await this.fileDataManager.getFolderInfo(backupFolder)

    // get all files and sort by date
    const files = folderInfo.files.sort(
      (f0, f1) => f0.dateUpdate.getTime() - f1.dateUpdate.getTime(),
    )

    // calculate limit date
    const limitDate = new Date(Date.now() - permission.maxTime * MAX_TIME_UNIT)

    // calculate the index of last file accepted by date
    let indexDate = 0
    for (let i = 0; i < files.length; i += 1) {
      if (DateUtils.compareDates(limitDate, files[i].dateUpdate) < 0) {
        indexDate = i
        break
      }
    }

    // calculate the index of the last file accepted by size
    let indexSize = 0
    let sumSize = 0
    for (let i = files.length - 1; i >= 0; i -= 1) {
      // update index and get file
      const file = files[i]

      // sum size
      sumSize += file.size

      // if sum size if bigger we add the file
      if (sumSize > permission.maxSize * MAX_SIZE_UNIT) {
        indexSize = Math.min(i + 1, files.length - 1)
        break
      }
    }

    // delete all files until index
    for (
      let i = 0;
      i < Math.max(indexDate, indexSize) &&
      i < files.length - permission.numMin;
      i += 1
    ) {
      // remove file
      Log.i(`Deleting file: '${files[i].path}'`)
      FileUtils.deleteFile(files[i].path)
    }

    return
  }
}
