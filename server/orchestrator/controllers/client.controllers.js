const { adminAPI, scheduleAPI, userAPI } = require('../helpers/axios')
const redis = require('../helpers/redis')

const HOME = 'client:home'

class ClientController {
  static async getHome(req, res, next) {
    try {
      const cached = await redis.get(HOME)
      if (cached) {
        return res.status(200).json(JSON.parse(cached))
      }
      const { data: podcasts } = await adminAPI.get('/posts', {
        params: { type: 'podcast' },
      })
      const { data: articles } = await adminAPI.get('/posts', {
        params: { type: 'article' },
      })
      const { data: videos } = await adminAPI.get('/posts', {
        params: { type: 'video' },
      })

      const result = { podcasts, articles, videos }
      await redis.set(HOME, JSON.stringify(result))

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getSchedule(req, res, next) {
    try {
      const { id } = req.user
      const { data: schedules } = await scheduleAPI.get('/schedules/user/' + id)
      const { data: counselors } = await userAPI.patch('/users/' + id, { type: 'counselor' })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClientController
