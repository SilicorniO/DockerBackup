export type SchemaValue = number | boolean | SchemaType
export type SchemaType = { [key: string]: SchemaValue }

export default class SchemaUtils {
  /**
   * Filter the fields of the dataOrig with the given schema
   * @param {*} dataOrig Object to read
   * @param {*=} schema Object with information about wich variables to keep
   * @param {*=} dataDst Object to return data, same than returned
   * @return {*} Generated object
   */
  public static fillSchemaValues(
    dataOrig: { [key: string]: any },
    schema: SchemaType | null = null,
    dataDst: { [key: string]: any } | null = null,
  ): { [key: string]: any } {
    if (!schema) {
      return dataOrig
    }

    if (dataDst == null) {
      dataDst = {}
    }

    if (dataOrig && dataDst && schema) {
      const keys = Object.keys(schema)
      for (const key of keys) {
        if (schema[key] === 1 || schema[key] === true) {
          if (dataOrig[key] !== undefined) {
            dataDst[key] = dataOrig[key]
          }
        } else if (dataOrig[key] != null) {
          if (dataOrig[key].constructor === Array) {
            const objects: any[] = []
            for (const dataOrigKey of dataOrig[key]) {
              const object = {}
              SchemaUtils.fillSchemaValues(
                dataOrigKey,
                schema[key] as SchemaType,
                object,
              )
              objects.push(object)
            }
            dataDst[key] = objects
          } else {
            const object = {}
            SchemaUtils.fillSchemaValues(
              dataOrig[key],
              schema[key] as SchemaType,
              object,
            )
            dataDst[key] = object
          }
        }
      }
    }
    return dataDst
  }
}
