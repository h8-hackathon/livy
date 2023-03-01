const Todo = require('../mongo/models/Todo')

class Controller {
  static async createTodo(req, res,) {
    try {
      const { todos, userId } = req.body

      await Todo.insertOne({ todos, UserId: userId })

      res.status(200).json({ message: "successfully created" })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }

  static async findById(req, res,) {
    try {
      const { userId } = req.params
      
      const todo = await Todo.findOne({}, {
        UserId: userId
      })

      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }

  static async updateTodo(req, res,) {
    try {
      const { userId } = req.params
      const { todos } = req.body

      await Todo.updateOne({ UserId: +userId }, { $set: { todos } })

      res.status(200).json({ message: "successfully updated" })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
  static async deleteTodo(req, res,) {
    try {
      const { userId } = req.params

      await Todo.deleteOne({ UserId: +userId })

      res.status(200).json({ message: "successfully deleted" })
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

module.exports = Controller