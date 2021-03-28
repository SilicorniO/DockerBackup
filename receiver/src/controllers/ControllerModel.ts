import DateUtils from "utils/date/DateUtils"

export const CONTROLLER_DATE_FORMAT = DateUtils.FORMAT_ZZZZ

export default interface ControllerModel {
  fill(obj: any)
  getObject(): { [key: string]: any }
}
