
const { adminAPI, userAPI,forumAPI, } = require('../helpers/axios')
const redis = require('../helpers/redis')

const POSTS = 'cms:posts'

class CMSController {
  static async getAllPost(req, res, next) {
    try {
      const cached = await redis.get(POSTS)
      if (cached) {
        return res.status(200).json(JSON.parse(cached))
      }
      const { data } = await adminAPI.get('/posts')
    

      await redis.set(POSTS, JSON.stringify(data))

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

module.exports = CMSController
