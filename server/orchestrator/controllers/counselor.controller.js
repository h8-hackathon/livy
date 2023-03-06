const { userAPI } = require('../helpers/axios')

class CounselorController {
  static async getStatusCounselor(req, res, next) {
    try {
      console.log(req.headers)
      const { access_token } = req.headers
      const response = await userAPI.post('/verify', { access_token })
      console.log(response.data)

      const { data: counselor } = await userAPI.get(
        `/submissions/${response.data.id}`
      )

      res.status(200).json(counselor)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CounselorController
