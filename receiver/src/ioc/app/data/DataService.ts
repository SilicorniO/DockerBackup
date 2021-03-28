import DataFile from "./model/DataFile"

export default interface DataService {
  addFiles(files: DataFile[]): Promise<void>
  cleanFiles(): Promise<void>
}
