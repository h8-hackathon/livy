const errorMiddleware = (err, req, res, next) => {
  if (err.response) {
    const { status, data } = err.response
    if (status === 500) console.log(data)
    return res.status(status).json(data)
  }

  console.log(err)
  res.status(500).json({ message: 'Internal Server Error' })
}

module.exports = errorMiddleware
