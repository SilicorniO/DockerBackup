import { BaseController } from "./BaseController"
import AddData from "./data/AddData"

export default class Controllers {
  public static get(): BaseController[] {
    return [...this.dataControllers()]
  }

  // ------ PRIVATE ------

  private static dataControllers(): BaseController[] {
    return [new AddData()]
  }
}
