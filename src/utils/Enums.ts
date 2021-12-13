/**
 * Enums for HTTP Status codes for readibility/mantainibilty
 */
enum HttpStatus {
    OK = 200,
    created = 201,
    NoContent = 204,
    BadRequest = 400,
    MethodNotAllowed = 405,
    InternalServerError = 500,
}
  
export default HttpStatus;