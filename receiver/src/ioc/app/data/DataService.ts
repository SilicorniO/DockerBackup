import DataFile from "./model/DataFile"

export default interface DataService {
  addFiles(files: DataFile[], userName?: string): Promise<void>
  cleanFiles(userName?: string): Promise<void>
}
