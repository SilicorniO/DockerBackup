import DateUtils from "../../../src/utils/date/DateUtils"

describe("DateUtils", () => {
  const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ"
  const TIMEZONE = "Europe/Madrid"

  const ISO_STRING_1 = "2019-02-18T21:10:05.200Z"

  const date1: Date = new Date() // 2019-02-18 21:10:05.200
  const date2: Date = new Date() // 2020-03-19 22:30:30.500

  beforeEach(() => {
    // date 1
    date1.setFullYear(2019)
    date1.setMonth(1)
    date1.setDate(18)
    date1.setUTCHours(21)
    date1.setMinutes(10)
    date1.setSeconds(5)
    date1.setMilliseconds(200)

    // date 2
    date2.setFullYear(2020)
    date2.setMonth(2)
    date2.setDate(19)
    date2.setUTCHours(22)
    date2.setMinutes(30)
    date2.setSeconds(30)
    date2.setMilliseconds(500)
  })

  test("mixDateAndTime timeZone", () => {
    const date = DateUtils.stringToDateUtc(
      "2020-05-23T22:00:00.000+0200",
      DateUtils.FORMAT_ZZZZ,
    )
    const time = DateUtils.stringToDateUtc(
      "2021-06-27T21:13:18.300+0200",
      DateUtils.FORMAT_ZZZZ,
    )
    const dateResult = DateUtils.mixDateAndTime(date, time, TIMEZONE)
    const sDateResult = DateUtils.dateToString(
      dateResult,
      DateUtils.FORMAT_ZZZZ,
      TIMEZONE,
    )

    expect(sDateResult).toBe("2020-05-23T21:13:18.300+0200")
  })

  test("mixDateAndTimeStrings timeZone-summer", () => {
    const sDate = "2020-05-23"
    const sTime = "21:13:18.300"
    const dateResult = DateUtils.mixDateAndTimeStrings(sDate, sTime, TIMEZONE)
    const sDateResult = DateUtils.dateToString(
      dateResult,
      DateUtils.FORMAT_ZZZZ,
      TIMEZONE,
    )

    expect(sDateResult).toBe("2020-05-23T21:13:18.300+0200")
  })

  test("mixDateAndTimeStrings timeZone-winter", () => {
    const sDate = "2020-01-05"
    const sTime = "21:13:18.300"
    const dateResult = DateUtils.mixDateAndTimeStrings(sDate, sTime, TIMEZONE)
    const sDateResult = DateUtils.dateToString(
      dateResult,
      DateUtils.FORMAT_ZZZZ,
      TIMEZONE,
    )

    expect(sDateResult).toBe("2020-01-05T21:13:18.300+0100")
  })

  test("dateStartOfDay", () => {
    const dateResult = DateUtils.dateStartOfDay(date1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())
    expect(dateResult.getDate()).toBe(date1.getDate())

    expect(dateResult.getHours()).toBe(0)
    expect(dateResult.getMinutes()).toBe(0)
    expect(dateResult.getSeconds()).toBe(0)
    expect(dateResult.getMilliseconds()).toBe(0)
  })

  test("dateStartOfDay timezone", () => {
    const date = DateUtils.stringToDateUtc(
      "2020-05-23T19:44:09.100+0000",
      DateUtils.FORMAT_ZZZZ,
    )
    const dateResult = DateUtils.dateStartOfDay(date, TIMEZONE)
    const sDateResultIso = DateUtils.dateToIsoString(dateResult)

    expect(sDateResultIso).toBe("2020-05-22T22:00:00.000Z")
  })

  test("dateStartOfMinute", () => {
    const dateResult = DateUtils.dateStartOfMinute(date1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())
    expect(dateResult.getDate()).toBe(date1.getDate())
    expect(dateResult.getHours()).toBe(date1.getHours())
    expect(dateResult.getMinutes()).toBe(date1.getMinutes())

    expect(dateResult.getSeconds()).toBe(0)
    expect(dateResult.getMilliseconds()).toBe(0)
  })

  test("dateEndOfDay", () => {
    const dateResult = DateUtils.dateEndOfDay(date1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())
    expect(dateResult.getDate()).toBe(date1.getDate())

    expect(dateResult.getHours()).toBe(23)
    expect(dateResult.getMinutes()).toBe(59)
    expect(dateResult.getSeconds()).toBe(59)
    expect(dateResult.getMilliseconds()).toBe(999)
  })

  test("dateStartOfMonth", () => {
    const dateResult = DateUtils.dateStartOfMonth(date1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())

    expect(dateResult.getDate()).toBe(1)
    expect(dateResult.getHours()).toBe(0)
    expect(dateResult.getMinutes()).toBe(0)
    expect(dateResult.getSeconds()).toBe(0)
    expect(dateResult.getMilliseconds()).toBe(0)
  })

  test("dateEndOfMonth", () => {
    const dateResult = DateUtils.dateEndOfMonth(date1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())

    expect(dateResult.getDate()).toBe(28)
    expect(dateResult.getHours()).toBe(23)
    expect(dateResult.getMinutes()).toBe(59)
    expect(dateResult.getSeconds()).toBe(59)
    expect(dateResult.getMilliseconds()).toBe(999)
  })

  test("dateAddMonths", () => {
    const dateResult = DateUtils.dateAddMonths(date1, 1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth() + 1)

    expect(dateResult.getDate()).toBe(date1.getDate())
    expect(dateResult.getHours()).toBe(date1.getHours())
    expect(dateResult.getMinutes()).toBe(date1.getMinutes())
    expect(dateResult.getSeconds()).toBe(date1.getSeconds())
    expect(dateResult.getMilliseconds()).toBe(date1.getMilliseconds())
  })

  test("dateAddDays", () => {
    const dateResult = DateUtils.dateAddDays(date1, 1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())

    expect(dateResult.getDate()).toBe(date1.getDate() + 1)
    expect(dateResult.getHours()).toBe(date1.getHours())
    expect(dateResult.getMinutes()).toBe(date1.getMinutes())
    expect(dateResult.getSeconds()).toBe(date1.getSeconds())
    expect(dateResult.getMilliseconds()).toBe(date1.getMilliseconds())
  })

  test("dateAddMinutes", () => {
    const dateResult = DateUtils.dateAddMinutes(date1, 1)

    expect(dateResult.getFullYear()).toBe(date1.getFullYear())
    expect(dateResult.getMonth()).toBe(date1.getMonth())
    expect(dateResult.getDate()).toBe(date1.getDate())
    expect(dateResult.getHours()).toBe(date1.getHours())
    expect(dateResult.getMinutes()).toBe(date1.getMinutes() + 1)
    expect(dateResult.getSeconds()).toBe(date1.getSeconds())
    expect(dateResult.getMilliseconds()).toBe(date1.getMilliseconds())
  })

  test("compareDates", () => {
    const dateResult = DateUtils.compareDates(date2, date1)

    expect(dateResult).toBe(date2.getTime() - date1.getTime())
  })

  test("isValidDate valid", () => {
    const dateResult = new Date()

    expect(DateUtils.isValidDate(dateResult)).toBeTruthy()
  })

  test("isValidDate invalid", () => {
    const dateResult = new Object()

    expect(DateUtils.isValidDate(dateResult)).toBeFalsy()
  })

  test("isIsoString valid", () => {
    const dateResult = ISO_STRING_1

    expect(DateUtils.isIsoString(dateResult)).toBeTruthy()
  })

  test("isIsoString invalid no T", () => {
    const dateResult = "2019-02-1922:30:30.500Z"

    expect(DateUtils.isIsoString(dateResult)).toBeFalsy()
  })

  test("isIsoString invalid no year", () => {
    const dateResult = "-02-19T22:30:30.500Z"

    expect(DateUtils.isIsoString(dateResult)).toBeFalsy()
  })

  test("notCheckedIsoStringToDate", () => {
    const dateResult = DateUtils.notCheckedIsoStringToDate(ISO_STRING_1)

    expect(dateResult != null).toBeTruthy()
  })

  test("isoStringToDate", () => {
    const dateResult = DateUtils.isoStringToDate(ISO_STRING_1)

    expect(dateResult != null).toBeTruthy()
  })

  test("stringToDate", () => {
    const dateResult = DateUtils.stringToDate(ISO_STRING_1, DATE_FORMAT)

    expect(DateUtils.compareDates(dateResult, date1)).toBe(0)
  })

  test("dateToIsoString", () => {
    const dateResult = DateUtils.dateToIsoString(date1)

    expect(dateResult).toBe(ISO_STRING_1)
  })

  test("stringToDate timezone london", () => {
    const date = DateUtils.stringToDate(
      "2019-10-02 19:32",
      DateUtils.FORMAT_DAY_AND_MINUTES,
      DateUtils.TIMEZONE_LONDON, // +0100 (summer time) for this day
    )

    const dateUtc = DateUtils.isoStringToDate("2019-10-02T18:32:00.000Z")

    expect(date.toISOString()).toBe(dateUtc.toISOString())
  })

  test("stringToDateUtc", () => {
    const date = DateUtils.stringToDateUtc(
      "2019-10-02 01:00",
      DateUtils.FORMAT_DAY_AND_MINUTES,
    )

    expect(DateUtils.dateToIsoString(date)).toBe("2019-10-02T01:00:00.000Z")
  })

  test("dateToString timezone london", () => {
    const date = DateUtils.dateToString(
      DateUtils.isoStringToDate("2019-10-02T18:32:00.000Z"),
      DateUtils.FORMAT_DAY_AND_MINUTES,
      DateUtils.TIMEZONE_LONDON, // +0100 (summer time) for this day
    )

    expect(date).toBe("2019-10-02 19:32")
  })

  test("dateToString utc", () => {
    const date = DateUtils.dateToStringUtc(
      DateUtils.stringToDate(
        "2021-01-30T11:10:00.000+0100",
        DateUtils.FORMAT_ZZZZ,
      ),
      DateUtils.FORMAT_DAY_TIME,
    )

    expect(date).toBe("2021-01-30 10:10:00")
  })

  test("get timezone lisbon", () => {
    const date = DateUtils.isoStringToDate("2020-05-16T09:47:00.000Z")
    const dayOfWeek = DateUtils.getDayOfWeek(date, DateUtils.TIMEZONE_LONDON)
    const dayOfMonth = DateUtils.getDayOfMonth(date, DateUtils.TIMEZONE_LONDON)
    const month = DateUtils.getMonth(date, DateUtils.TIMEZONE_LONDON)
    const year = DateUtils.getYear(date, DateUtils.TIMEZONE_LONDON)

    expect(dayOfWeek).toBe(6)
    expect(dayOfMonth).toBe(16)
    expect(month).toBe(4)
    expect(year).toBe(2020)
  })

  test("get timezone New York year change", () => {
    const timeZone = "America/New_York"
    const date = DateUtils.isoStringToDate("2020-01-01T01:00:00.000Z")
    const dayOfWeek = DateUtils.getDayOfWeek(date, timeZone)
    const dayOfMonth = DateUtils.getDayOfMonth(date, timeZone)
    const month = DateUtils.getMonth(date, timeZone)
    const year = DateUtils.getYear(date, timeZone)

    expect(dayOfWeek).toBe(2)
    expect(dayOfMonth).toBe(31)
    expect(month).toBe(11)
    expect(year).toBe(2019)
  })
})
