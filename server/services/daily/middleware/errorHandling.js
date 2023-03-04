const errorHandling = async (err, req, res, next) => {
  let status = 500
  let message = "Internal Server Error"

  switch (err.message) {
    case "Not Found":
      status = 404
      message = 'Document Not Found'
      break;
    case "Document failed validation":
      status = 400
      message = err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description
    case "Document exist":
      status = 400
      message = "Document already exist"

  }

  res.status(status).json({ message })
}

module.exports = errorHandling