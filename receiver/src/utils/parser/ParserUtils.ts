import DateUtils from "../date/DateUtils"

export default class ParserUtils {
  // ----- DATE -----

  public static parseNullableDate(
    value: any,
    format: string | null,
  ): Date | null {
    // check is a string
    if (!ParserUtils.isString(value)) {
      return null
    }

    if (format == null) {
      return DateUtils.isoStringToDate(value)
    }

    const date = DateUtils.stringToDate(value, format)
    if (isNaN(date.getTime())) {
      return null
    }
    return date
  }

  public static parseDate(
    value: any,
    format: string | null,
    defaultValue: Date,
  ): Date {
    // check is a string
    if (!ParserUtils.isString(value)) {
      return defaultValue
    }

    if (format == null) {
      return DateUtils.isoStringToDate(value)
    }

    const date = DateUtils.stringToDate(value, format)
    if (isNaN(date.getTime())) {
      return defaultValue
    }
    return date
  }

  // ----- STRING ------

  public static isString(value: any): boolean {
    // check value is not null
    if (value == null) {
      return false
    }

    // check value is a string
    if (typeof value !== "string") {
      return false
    }

    return true
  }

  public static parseNullableString(value: any): string | null {
    // check is a string
    if (!ParserUtils.isString(value)) {
      return null
    }

    return value
  }

  public static parseString(value: any, defaultValue: string): string {
    // check is a string
    if (!ParserUtils.isString(value)) {
      return defaultValue
    }

    return value
  }

  public static parseStringOrArrayToArray(value: string | string[]): string[] {
    let aStrings: string[] = []

    if (value == null) {
      return aStrings
    }

    // if trackingId is an string we convert it to an array
    if (ParserUtils.isString(value)) {
      aStrings = [value as string]
    } else {
      aStrings = value as string[]
    }

    return aStrings
  }

  // ----- BOOLEAN -----

  public static isBoolean(value: any): boolean {
    // check value is not null
    if (value == null) {
      return false
    }

    // check value is a boolean
    // if (typeof value !== "string") {
    // 	return false
    // }

    return true
  }

  public static parseNullableBoolean(value: any): boolean | null {
    // check is a boolean
    if (!ParserUtils.isBoolean(value)) {
      return null
    }

    return value
  }

  public static parseBoolean(value: any, defaultValue: boolean): boolean {
    // check is a string
    if (!ParserUtils.isBoolean(value)) {
      return defaultValue
    }

    return value
  }

  // ----- NUMBER ------

  public static isNumber(value: any): boolean {
    // check value is not null
    if (value == null) {
      return false
    }

    // check if it is string and length is 0
    if (ParserUtils.isString(value) && (value as string).length == 0) {
      return false
    }

    // check value is a number
    const num = Number(value)
    if (num == null || isNaN(num)) {
      return false
    }

    return true
  }

  public static parseNullableNumber(value: any): number | null {
    // check is a number
    if (!ParserUtils.isNumber(value)) {
      return null
    }

    return Number(value)
  }

  public static parseUndefinedNumber(value: any): number | undefined {
    // check is a number
    if (!ParserUtils.isNumber(value)) {
      return undefined
    }

    return Number(value)
  }

  public static parseNumber(value: any, defaultValue: number): number {
    // check is a number
    if (!ParserUtils.isNumber(value)) {
      return defaultValue
    }

    return Number(value)
  }

  // ----- ARRAY ------

  public static isArray(value: any): boolean {
    // check value is not null
    if (value == null) {
      return false
    }

    // check value is an array
    if (!Array.isArray(value)) {
      return false
    }

    return true
  }

  static parseArray<T>(value: any, parseFn: (value: any) => T) {
    // check is an array
    if (!ParserUtils.isArray(value)) {
      return []
    }

    // check all fields are strings
    const arrayParsed: T[] = []
    for (const v of value) {
      const vParsed = parseFn(v)
      if (vParsed != null) {
        arrayParsed.push(vParsed)
      }
    }

    // return array
    return arrayParsed
  }

  public static parseArrayString(value: any): string[] {
    // check is an array
    if (!ParserUtils.isArray(value)) {
      return []
    }

    // check all fields are strings
    for (const v of value) {
      if (!ParserUtils.isString(v)) {
        return []
      }
    }

    // return array
    return value
  }

  public static parseNullableArrayString(value: any): string[] | null {
    // check is an array
    if (!ParserUtils.isArray(value)) {
      return null
    }

    // check all fields are strings
    for (const v of value) {
      if (!ParserUtils.isString(v)) {
        return null
      }
    }

    // return array
    return value
  }

  public static parseArrayNumber(value: any): number[] {
    // check is an array
    if (!ParserUtils.isArray(value)) {
      return []
    }

    // check all fields are strings
    for (const v of value) {
      if (!ParserUtils.isNumber(v)) {
        return []
      }
    }

    // return array
    return value
  }

  public static parseNullableArrayNumber(value: any): number[] | null {
    // check is an array
    if (!ParserUtils.isArray(value)) {
      return null
    }

    // check all fields are strings
    for (const v of value) {
      if (!ParserUtils.isNumber(v)) {
        return null
      }
    }

    // return array
    return value
  }

  // ----- STRING ------

  public static isObject(value: any): boolean {
    // check value is not null
    if (value == null) {
      return false
    }

    // check value is a string
    if (value.constructor != {}.constructor) {
      return false
    }

    return true
  }

  public static parseNullableObject(value: any): { [key: string]: any } | null {
    // check is a string
    if (!ParserUtils.isObject(value)) {
      return null
    }

    return value
  }

  public static parseObject(
    value: any,
    defaultValue: { [key: string]: any },
  ): { [key: string]: any } {
    // check is a string
    if (!ParserUtils.isObject(value)) {
      return defaultValue
    }

    return value
  }
}
