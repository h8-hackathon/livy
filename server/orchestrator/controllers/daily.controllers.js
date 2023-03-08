const { userAPI, scheduleAPI, chatAPI, dailyAPI } = require('../helpers/axios')

class DailyController {
  static async postTodos(req, res, next) {
    console.log(req.body)
    try {
        const response = await dailyAPI.post("/todos", {
            ...req.body
          });
        res.status(response.status).json(response.data)
    } catch (error) {
      next(error)
    }
  }
  static async getTodos(req, res, next) {
    try {
        const response = await dailyAPI.get("/todos/"+req.params.userId);
        res.status(response.status).json(response.data)
    } catch (error) {
      next(error)
    }
  }
  static async updateTodos(req, res, next) {
    try {
        const response = await dailyAPI.put("/todos/"+req.params.userId, {
            ...req.body
          });
        res.status(response.status).json(response.data)
    } catch (error) {
      next(error)
    }
  }
  static async deleteTodos(req, res, next) {
    try {
        const response = await dailyAPI.delete("/todos/"+req.params.userId);
        res.status(response.status).json(response.data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DailyController

/**
 *
 * {
 *
 * "availability": [
 *   "dayOfWeek": "Monday",
 *   slots: []
 * ]
 */
