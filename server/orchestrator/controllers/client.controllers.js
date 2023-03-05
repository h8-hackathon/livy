const { adminAPI, scheduleAPI, userAPI } = require('../helpers/axios')
const redis = require('../helpers/redis')

const HOME = 'client:home'
const COUNSELOR = 'client:counselor'

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
      await redis.expire(HOME, 300)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getSchedule(req, res, next) {
    try {
      const { access_token } = req.headers
      const { data: user } = await userAPI.get('/verify', { access_token })
      const { data: schedules } = await scheduleAPI.get(
        '/schedules/user/' + user.id
      )
      res.status(200).json(schedules)
    } catch (error) {
      next(error)
    }
  }

  static async getAllCounselor(req, res, next) {
    try {
      const cache = await redis.get(COUNSELOR)
      if (cache) {
        return res.status(200).json(JSON.parse(cache))
      }
      const { data: counselors } = await adminAPI.get('/counselors')
      await redis.set(COUNSELOR, JSON.stringify(counselors))
      await redis.expire(COUNSELOR, 300)
      
      res.status(200).json(counselors.filter((el) => el.status !== 'pending'))
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClientController
