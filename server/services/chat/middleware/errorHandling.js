const errorHandling = async (err, req, res, next) => {
  let status = 500
  let message = "Internal Server Error"

  switch (err.name) {
    case "NotFound":
      status = 404
      message = 'Document Not Found'
      break;
  }

  res.status(status).json({ message })
}

module.exports = errorHandling