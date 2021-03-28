import ParserUtils from "utils/parser/ParserUtils"

export default class PaginationUtils {
  public static parsePageSize(
    value: any,
    sizeMin: number,
    sizeMax: number,
  ): number {
    const pageSize = ParserUtils.parseNullableNumber(value) || sizeMin
    if (pageSize < sizeMin) {
      return sizeMin
    } else if (pageSize > sizeMax) {
      return sizeMax
    } else {
      return pageSize
    }
  }

  public static parsePageNum(value: any): number {
    const pageNum = ParserUtils.parseNullableNumber(value) || 0
    if (pageNum < 0) {
      return 0
    } else {
      return pageNum
    }
  }
}
