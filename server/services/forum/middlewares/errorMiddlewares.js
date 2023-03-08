/* istanbul ignore file */
const errorMiddlewares = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'
  
    if (err.code === 121) {
      status = 400
      message =
        err.errInfo?.details?.schemaRulesNotSatisfied[0]
          ?.propertiesNotSatisfied[0]?.description 
    }else if(err.code === 404){ status = 404
      message = 'Data Not Found' }
  
    if(status === 500 || !message) console.log(err)
    res.status(status).json({ message })
  }
  
  module.exports = errorMiddlewares