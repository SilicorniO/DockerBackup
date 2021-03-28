import SchemaUtils from "utils/schema/SchemaUtils"
describe("SchemaUtils", () => {
  it("fillSchemaValues filter values", () => {
    const result = SchemaUtils.fillSchemaValues(
      {
        test_1: 1,
        test_2: 2,
        test_3: "three",
        test_4: "four",
      },
      {
        test_1: true,
        test_3: true,
      },
    )

    expect(result.test_1).toBe(1)
    expect(result.test_2).toBeUndefined()
    expect(result.test_3).toBe("three")
    expect(result.test_4).toBeUndefined()
  })
})
