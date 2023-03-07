/* istanbul ignore file */
module.exports = function errorHandler(err, req, res, next) {
    let status;
    let message;
  
    switch (err.name) {
      case "SequelizeValidationError":
        status = 400
        message = err.errors[0].message
        break;
      case "SequelizeUniqueConstraintError":
        status = 400
        message = err.errors[0].message
        break;
      case "EmailOrPasswordIsRequired":
        status = 400
        message = "Email Or Password Is Required"
        break
      case "NotFound":
        status = 404
        message = "Data not found"
        break
      case "OnlyAccept 1 or -1":
        status = 404
        message = "helpful only accept 1 or -1"
        break
      case "InvalidCredentials":
        status = 400
        message = "InvalidCredentials"
        break
      case "Unauthenticated":
      case "JsonWebTokenError":
        status = 401
        message = "Invalid Token"
        break
      case "Forbidden":
        status = 403
        message = "Forbidden"
        break
      default:
        status = 500
        message = "Internal Server Error"
        break
    }
    if(status === 500) console.log(err)
    res.status(status).json({
      message: message
    })
  }