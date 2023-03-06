const { userAPI, scheduleAPI, chatAPI } = require('../helpers/axios')

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

  static async getCounselorAvailability(req, res, next) {
    try {
      console.log('masuk')
      const { access_token } = req.headers
      const { data: user } = await userAPI.post('/verify', { access_token })

      const { data: counselor } = await userAPI.get(`/submissions/${user.id}`)
      const { data: availability } = await scheduleAPI.get(
        `/schedules/counselor/${user.id}/availability`
      )

      res.status(200).json({ user, counselor, availability })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async editAvailability(req, res, next) {
    try {
      const { access_token } = req.headers
      const {
        data: { id },
      } = await userAPI.post('/verify', { access_token })
      const { data: availability } = await scheduleAPI.put(
        `/schedules/counselor/${id}/availability`,
        { availability: req.body.availability }
      )

      const { data: counselor } = await userAPI.put(
        `/counselor/${id}/submissions`,
        req.body.submission
      )
      console.log(counselor, availability)

      res.status(200).json({ message: 'Success update' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async updateCounselorProfile(req, res, next) {
    try {
      const { access_token } = req.headers
      const {
        data: { id },
      } = await userAPI.post('/verify', { access_token })
      const { dob, name, gender } = req.body
      const { data } = await userAPI.put(`/users/${id}`, { dob, name, gender })

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getChatList(req, res, next) {
    try {
      const { access_token } = req.headers
      const {
        data: { id },
      } = await userAPI.post('/verify', { access_token })
      const { data } = await scheduleAPI.get(`/schedules/counselor/${id}`)
      const filteredData = data.filter((el) => el.status === 'paid')
      res.status(200).json(filteredData)
    } catch (error) {
      next(error)
    }
  }

  static async getChat(req, res, next) {
    try {
      const { access_token } = req.headers
      const {
        data: { id },
      } = await userAPI.post('/verify', { access_token })
      const { data } = await scheduleAPI.get(`/schedules/counselor/${id}`)
      const filteredData = data.filter((el) => el.status === 'paid')
      res.status(200).json(filteredData)
    } catch (error) {
      next(error)
    }
  }

  static async getChatByUserId(req, res, next) {
    try {
      const { access_token } = req.headers
      const { userId } = req.params
      const {
        data: { id: counselorId },
      } = await userAPI.post('/verify', { access_token })
      const { data } = await chatAPI.get(
        `/history/${userId}/${counselorId}`
      )
      const { data: user } = await userAPI.get(`/users/${userId}`)
      res.status(200).json({ ...data, user })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = CounselorController

/**
 *
 * {
 *
 * "availability": [
 *   "dayOfWeek": "Monday",
 *   slots: []
 * ]
 */
