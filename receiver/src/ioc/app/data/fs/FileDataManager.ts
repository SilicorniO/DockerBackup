import FileInfo from "./model/FileInfo"
import * as Fs from "fs"
import { FileUtils } from "utils/file/FileUtils"
import FolderInfo from "./model/FolderInfo"

export default class FileDataManager {
  public async getFolderInfo(folderPath: string): Promise<FolderInfo> {
    // file infos to return
    const fileInfos: FileInfo[] = []
    let folderSize = 0

    // get files
    const fileNames = Fs.readdirSync(folderPath)

    // for each file generate the file info
    for (const fileName of fileNames) {
      const filePath = `${folderPath}/${fileName}`
      // size
      const size = (await FileUtils.getFilesizeInBytes(filePath)) || 0
      folderSize += size

      // dateCreation
      const dateUpdate = FileUtils.getFileDateUpdate(filePath)

      // generate the file info
      fileInfos.push({
        path: filePath,
        size: size,
        dateUpdate: dateUpdate,
      })
    }

    return {
      size: folderSize,
      files: fileInfos,
    }
  }
}
