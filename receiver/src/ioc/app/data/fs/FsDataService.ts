import { Configuration } from "general/Configuration"
import { Log } from "general/Log"
import { injectable } from "inversify"
import AppError from "ioc/app/AppError"
import DateUtils from "utils/date/DateUtils"
import { FileUtils } from "utils/file/FileUtils"
import DataService from "../DataService"
import DataFile from "../model/DataFile"
import FileDataManager from "./FileDataManager"
import FileInfo from "./model/FileInfo"

const MAX_TIME_UNIT = 1000 // seconds

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

    // check there are more files than minimum
    if (folderInfo.files.length > permission.numMin) {
      // remove all files out of date
      const filesNotDeleted: FileInfo[] = []
      const limitDate = new Date(
        Date.now() - permission.maxTime * MAX_TIME_UNIT,
      )
      for (const file of folderInfo.files) {
        if (DateUtils.compareDates(limitDate, file.dateUpdate) > 0) {
          // remove file
          FileUtils.deleteFile(file.path)
        } else {
          filesNotDeleted.push(file)
        }
      }
    }

    return
  }
}
