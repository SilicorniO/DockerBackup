import ParserUtils from "../../../src/utils/parser/ParserUtils"

describe("ParserUtils", () => {
  const VALUE_DATE_STRING = "2019-02-18T19:25:30.001Z"
  const VALUE_DATE_FORMAT = "YYYY-MM-DD'T'HH:mm:ss.SSSZ"

  const VALUE_STRING = "text"
  const VALUE_STRING_DEFAULT = "default"
  const VALUE_BOOLEAN = true
  const VALUE_BOOLEAN_DEFAULT = false
  const VALUE_NUMBER = 1
  const VALUE_NUMBER_DEFAULT = 2

  const VALUE_ARRAY_NUMBER = [1, 2]
  const VALUE_ARRAY_STRING = ["1", "2"]

  // date

  it("parseNullableDate return null", () => {
    const parserDate = ParserUtils.parseNullableDate(null, null)

    expect(parserDate).toBeNull()
  })

  it("parseNullableDate return date format null", () => {
    const parserDate = ParserUtils.parseNullableDate(VALUE_DATE_STRING, null)
    const parserDateString =
      parserDate != null ? parserDate.toISOString() : null
    const dateString = new Date(VALUE_DATE_STRING).toISOString()

    expect(parserDateString).toBe(dateString)
  })

  it("parseNullableDate return date with format", () => {
    const parserDate = ParserUtils.parseNullableDate(
      VALUE_DATE_STRING,
      VALUE_DATE_FORMAT,
    )
    const parserDateString =
      parserDate != null ? parserDate.toISOString() : null
    const dateString = new Date(VALUE_DATE_STRING).toISOString()

    expect(parserDateString).toBe(dateString)
  })

  it("parseDate null ", () => {
    const dateDefault = new Date()
    const parserDate = ParserUtils.parseDate(null, null, dateDefault)

    expect(parserDate).toBe(dateDefault)
  })

  it("parseDate format null", () => {
    const date = new Date(VALUE_DATE_STRING)
    const dateDefault = new Date()
    const parserDate = ParserUtils.parseDate(
      VALUE_DATE_STRING,
      null,
      dateDefault,
    )
    const parserDateString = parserDate.toISOString()
    const dateString = date.toISOString()

    expect(parserDateString).toBe(dateString)
  })

  it("parseDate with format", () => {
    const date = new Date(VALUE_DATE_STRING)
    const dateDefault = new Date()
    const parserDate = ParserUtils.parseDate(
      VALUE_DATE_STRING,
      VALUE_DATE_FORMAT,
      dateDefault,
    )
    const parserDateString = parserDate.toISOString()
    const dateString = date.toISOString()

    expect(parserDateString).toBe(dateString)
  })

  // string

  it("isString true", () => {
    expect(ParserUtils.isString(VALUE_STRING)).toBeTruthy()
  })

  it("isString number", () => {
    expect(ParserUtils.isString(VALUE_NUMBER)).toBeFalsy()
  })

  it("isString null", () => {
    expect(ParserUtils.isString(null)).toBeFalsy()
  })

  it("parseNullableString null", () => {
    expect(ParserUtils.parseNullableString(null)).toBe(null)
  })

  it("parseNullableString string", () => {
    expect(ParserUtils.parseNullableString(VALUE_STRING)).toBe(VALUE_STRING)
  })

  it("parseString default", () => {
    expect(ParserUtils.parseString(null, VALUE_STRING_DEFAULT)).toBe(
      VALUE_STRING_DEFAULT,
    )
  })

  it("parseString default", () => {
    expect(ParserUtils.parseString(VALUE_STRING, VALUE_STRING_DEFAULT)).toBe(
      VALUE_STRING,
    )
  })

  it("parseStringOrArrayToArray string", () => {
    expect(ParserUtils.parseStringOrArrayToArray(VALUE_STRING)[0]).toBe(
      VALUE_STRING,
    )
  })

  it("parseStringOrArrayToArray array", () => {
    expect(ParserUtils.parseStringOrArrayToArray(VALUE_ARRAY_STRING)[0]).toBe(
      VALUE_ARRAY_STRING[0],
    )
    expect(ParserUtils.parseStringOrArrayToArray(VALUE_ARRAY_STRING)[1]).toBe(
      VALUE_ARRAY_STRING[1],
    )
  })

  // boolean

  it("isBoolean true", () => {
    expect(ParserUtils.isBoolean(VALUE_BOOLEAN)).toBeTruthy()
  })

  it("isBoolean null", () => {
    expect(ParserUtils.isBoolean(null)).toBeFalsy()
  })

  it("parseNullableBoolean null", () => {
    expect(ParserUtils.parseNullableBoolean(null)).toBeNull()
  })

  it("parseNullableBoolean boolean", () => {
    expect(ParserUtils.parseNullableBoolean(VALUE_BOOLEAN)).toBe(VALUE_BOOLEAN)
  })

  it("parseBoolean default", () => {
    expect(ParserUtils.parseBoolean(null, VALUE_BOOLEAN_DEFAULT)).toBe(
      VALUE_BOOLEAN_DEFAULT,
    )
  })

  it("parseBoolean default", () => {
    expect(ParserUtils.parseBoolean(VALUE_BOOLEAN, VALUE_BOOLEAN_DEFAULT)).toBe(
      VALUE_BOOLEAN,
    )
  })

  // number

  it("isNumber true", () => {
    expect(ParserUtils.isNumber(VALUE_NUMBER)).toBeTruthy()
  })

  it("isNumber string", () => {
    expect(ParserUtils.isNumber(VALUE_STRING)).toBeFalsy()
  })

  it("isNumber null", () => {
    expect(ParserUtils.isNumber(null)).toBeFalsy()
  })

  it("parseNullableNumber null", () => {
    expect(ParserUtils.parseNullableNumber(null)).toBe(null)
  })

  it("parseNullableNumber number", () => {
    expect(ParserUtils.parseNullableNumber(VALUE_NUMBER)).toBe(VALUE_NUMBER)
  })

  it("parseNumber default", () => {
    expect(ParserUtils.parseNumber(null, VALUE_NUMBER_DEFAULT)).toBe(
      VALUE_NUMBER_DEFAULT,
    )
  })

  it("parseNumber default", () => {
    expect(ParserUtils.parseNumber(VALUE_NUMBER, VALUE_NUMBER_DEFAULT)).toBe(
      VALUE_NUMBER,
    )
  })

  // array

  it("isArray true", () => {
    expect(ParserUtils.isArray(VALUE_ARRAY_NUMBER)).toBeTruthy()
  })

  it("isArray string", () => {
    expect(ParserUtils.isArray(VALUE_STRING)).toBeFalsy()
  })

  it("isArray null", () => {
    expect(ParserUtils.isArray(null)).toBeFalsy()
  })

  it("parseNullableArrayString null", () => {
    expect(ParserUtils.parseNullableArrayString(null)).toBeNull()
  })

  it("parseNullableArrayString number", () => {
    expect(ParserUtils.parseNullableArrayString(VALUE_ARRAY_STRING)).toBe(
      VALUE_ARRAY_STRING,
    )
  })

  it("parseArrayString default", () => {
    expect(ParserUtils.parseArrayString(null).length === 0).toBeTruthy()
  })

  it("parseArrayString ok", () => {
    expect(ParserUtils.parseArrayString(VALUE_ARRAY_STRING)).toBe(
      VALUE_ARRAY_STRING,
    )
  })

  it("parseNullableArrayNumber null", () => {
    expect(ParserUtils.parseNullableArrayNumber(null)).toBeNull()
  })

  it("parseNullableArrayNumber number", () => {
    expect(ParserUtils.parseNullableArrayNumber(VALUE_ARRAY_NUMBER)).toBe(
      VALUE_ARRAY_NUMBER,
    )
  })

  it("parseArrayNumber default", () => {
    expect(ParserUtils.parseArrayNumber(null).length === 0).toBeTruthy()
  })

  it("parseArrayNumber ok", () => {
    expect(ParserUtils.parseArrayNumber(VALUE_ARRAY_NUMBER)).toBe(
      VALUE_ARRAY_NUMBER,
    )
  })

  it("parseObject ok", () => {
    const obj = JSON.parse(`{"test": "value"}`)
    const parsedObj = ParserUtils.parseObject(obj, {})
    expect(parsedObj.test).toBe("value")
  })

  it("parseObject array nullable", () => {
    const obj = JSON.parse(`[{"test": "value"}]`)
    const parsedObj = ParserUtils.parseNullableObject(obj)
    expect(parsedObj).toBe(null)
  })

  it("parseObject string with default", () => {
    const obj = JSON.parse(`"test"`)
    const obj2 = { test2: "test2" }
    const parsedObj = ParserUtils.parseObject(obj, obj2)
    expect(parsedObj.test2).toBe("test2")
  })
})
