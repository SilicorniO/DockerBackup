import * as moment from "moment-timezone"

export default class DateUtils {
  public static FORMAT_TIME = "HH:mm:ss"
  public static FORMAT_TIME_MS = "HH:mm:ss.SSS"
  public static FORMAT_DAY = "YYYY-MM-DD"
  public static FORMAT_MINUTES = "HH:mm"
  public static FORMAT_DAY_AND_MINUTES =
    DateUtils.FORMAT_DAY + " " + DateUtils.FORMAT_MINUTES
  public static FORMAT_DAY_TIME =
    DateUtils.FORMAT_DAY + " " + DateUtils.FORMAT_TIME
  public static FORMAT_Z =
    DateUtils.FORMAT_DAY + "T" + DateUtils.FORMAT_TIME + ".SSSZ"
  public static FORMAT_ZZZZ =
    DateUtils.FORMAT_DAY + "T" + DateUtils.FORMAT_TIME + ".SSSZZ"

  public static TIMEZONE_LONDON = "Europe/London"
  public static TIMEZONE_SPAIN = "Europe/Madrid"

  public static getNow(): Date {
    return moment().toDate()
  }

  // ----- MODIFY DATES -----

  public static mixDateAndTime(
    date: Date,
    time: Date,
    timeZone: string | null = null,
  ): Date {
    const sDate = DateUtils.dateToString(date, DateUtils.FORMAT_DAY, timeZone)
    const sTime = DateUtils.dateToString(
      time,
      DateUtils.FORMAT_TIME + ".SSS",
      timeZone,
    )
    const sEnd = DateUtils.dateToString(date, "ZZ", timeZone)
    return DateUtils.stringToDate(sDate + sTime + sEnd, DateUtils.FORMAT_ZZZZ)
  }

  public static mixDateAndTimeStrings(
    sDate: string,
    sTime: string,
    timeZone: string | null = null,
  ): Date {
    return DateUtils.stringToDate(
      sDate + sTime,
      DateUtils.FORMAT_ZZZZ,
      timeZone,
    )
  }

  public static dateStartOfDay(
    date: Date,
    timeZone: string | null = null,
  ): Date {
    let mDate
    if (timeZone != null) {
      mDate = moment.tz(date, timeZone)
    } else {
      mDate = moment(date)
    }

    mDate.hour(0)
    mDate.minute(0)
    mDate.second(0)
    mDate.millisecond(0)

    return mDate.toDate()
  }

  public static dateStartOfMinute(date: Date): Date {
    const mDate = moment(date)

    mDate.second(0)
    mDate.millisecond(0)

    return mDate.toDate()
  }

  public static dateEndOfDay(date: Date): Date {
    const mDate = moment(date)

    mDate.hour(23)
    mDate.minute(59)
    mDate.second(59)
    mDate.millisecond(999)

    return mDate.toDate()
  }

  public static dateStartOfMonth(
    date: Date,
    timeZone: string | null = null,
  ): Date {
    let mDate
    if (timeZone != null) {
      mDate = moment.tz(date, timeZone)
    } else {
      mDate = moment(date)
    }

    // set the first day of the month
    mDate.date(1)

    return this.dateStartOfDay(mDate.toDate())
  }

  public static dateEndOfMonth(date: Date): Date {
    // set as the first day of the month
    const mDate = moment(this.dateStartOfMonth(date))

    // increment 1 the month
    mDate.add(1, "M")

    // decrement 1 second
    mDate.subtract(1, "ms")

    return mDate.toDate()
  }

  /**
   * Generate a new date adding the given months
   * @param numYears number of months to add, can be negative
   * @return generated
   */
  public static dateAddYears(date: Date, numYears: number): Date {
    // increment 1 the month
    return moment(date).add(numYears, "year").toDate()
  }

  /**
   * Generate a new date adding the given months
   * @param numMonths number of months to add, can be negative
   * @return generated
   */
  public static dateAddMonths(date: Date, numMonths: number): Date {
    // increment 1 the month
    return moment(date).add(numMonths, "month").toDate()
  }

  /**
   * Generate a new date adding the given days
   * @param numDays number of days to add, can be negative
   * @return generated
   */
  public static dateAddDays(date: Date, numDays: number): Date {
    // increment 1 the month
    return moment(date).add(numDays, "day").toDate()
  }

  /**
   * Generate a new date adding the given hours
   * @param numHours number of hours to add, can be negative
   * @return generated
   */
  public static dateAddHours(date: Date, numHours: number): Date {
    // increment 1 the month
    return moment(date).add(numHours, "hour").toDate()
  }

  /**
   * Generate a new date adding the given minutes
   * @param numMinutes number of minutes to add, can be negative
   * @return generated
   */
  public static dateAddMinutes(date: Date, numMinutes: number): Date {
    // increment 1 the month
    return moment(date).add(numMinutes, "minute").toDate()
  }

  /**
   * Generate a new date adding the given minutes
   * @param numSeconds number of minutes to add, can be negative
   * @return generated
   */
  public static dateAddSeconds(date: Date, numSeconds: number): Date {
    // increment 1 the month
    return moment(date).add(numSeconds, "second").toDate()
  }

  // ----- CHECKS -----

  public static compareDates(dateStart: Date, dateEnd: Date): number {
    return moment(dateStart).diff(moment(dateEnd))
  }

  public static isValidDate(oDate: any): boolean {
    if (Object.prototype.toString.call(oDate) === "[object Date]") {
      // it is a date
      if (isNaN(oDate.getTime())) {
        // d.valueOf() could also work
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  public static isIsoString(sDate: string): boolean {
    return moment(sDate, moment.ISO_8601).isValid()
  }

  // ----- STRING TO DATE -----

  /**
   * Read a date with the iso format
   * @return generated date
   */
  public static notCheckedIsoStringToDate(sDate?: string): Date | null {
    // check not null
    if (sDate == null) {
      return null
    }

    // convert to date
    try {
      return DateUtils.isoStringToDate(sDate)
    } catch (e) {
      return null
    }
  }

  /**
   * Read a date with the iso format
   * @return generated date
   */
  public static isoStringToDate(sDate: string): Date {
    const mDate = moment(sDate)
    return mDate.toDate()
  }

  /**
   * Read a date with the given format
   * @return generated date
   */
  public static stringToDate(
    sDate: string,
    format: string = "",
    timeZone: string | null = null,
  ): Date {
    if (timeZone != null) {
      const mDate = moment.tz(sDate, format, timeZone)
      return mDate.toDate()
    } else {
      const mDate = moment(sDate, format)
      return mDate.toDate()
    }
  }

  public static stringToDateUtc(sDate: string, format: string = ""): Date {
    const mDate = moment.utc(sDate, format)
    return mDate.toDate()
  }

  // ----- DATE TO STRING -----

  public static dateToIsoString(date: Date): string {
    return moment(date).toISOString()
  }

  /**
   * Read a date with the given format
   * @param utc default false
   * @return generated date
   */
  public static dateToString(
    date: Date,
    format: string,
    timeZone: string | null = null,
  ): string {
    const mDate = moment(date)
    if (timeZone != null) {
      mDate.tz(timeZone)
    }
    return mDate.format(format)
  }

  public static dateToStringUtc(date: Date, format: string): string {
    const mDate = moment(date).utc()
    return mDate.format(format)
  }

  // ----- GET FIELDS -----

  public static getDayOfWeek(
    date: Date,
    timeZone: string | null = null,
  ): number {
    if (timeZone != null) {
      const mDate = moment.tz(date, timeZone)
      return mDate.isoWeekday()
    } else {
      return moment(date).isoWeekday()
    }
  }

  public static getDayOfMonth(
    date: Date,
    timeZone: string | null = null,
  ): number {
    if (timeZone != null) {
      const mDate = moment.tz(date, timeZone)
      return mDate.date()
    } else {
      return date.getDate()
    }
  }

  public static getMonth(date: Date, timeZone: string | null = null): number {
    if (timeZone != null) {
      const mDate = moment.tz(date, timeZone)
      return mDate.month()
    } else {
      return date.getMonth()
    }
  }

  public static getYear(date: Date, timeZone: string | null = null): number {
    if (timeZone != null) {
      const mDate = moment.tz(date, timeZone)
      return mDate.year()
    } else {
      return date.getFullYear()
    }
  }
}
