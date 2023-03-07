const { userAPI } = require('../helpers/axios')

class AuthController {
  static async login(req, res, next) {
    try {
      console.log(req.body)
      const response = await userAPI.post('/users', req.body)

      res.status(response.status).json(response.data)
    } catch (error) {
      // console.log(error)
      next(error)
    }
  }

  static async verify(req, res, next) {
    try {
      const { access_token } = req.body
      const response = await userAPI.post('/verify', { access_token })
      res.status(200).json(response.data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
