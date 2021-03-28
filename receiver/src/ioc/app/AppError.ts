export default class AppError extends Error {
  code: string

  constructor(code: string) {
    super()
    this.code = code
  }

  toString() {
    return this.code
  }

  static generate(code: string) {
    return new AppError(code)
  }
}
