/**
 * An error from the API describing a field that had an invalid value.
 */
export type ValidationError = {
  // The name causing the error, or null for a general error.
  field?: string

  // If field is a collection, contains the index in the collection.
  index?: number

  // Associated message describing the error.
  message?: string

  // The value that caused the error, or null if a general error or the value is omitted for security.
  value?: any

  // If applicable, the expected value for this field.
  expected?: any
}
