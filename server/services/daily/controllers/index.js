/* istanbul ignore file */
const { convertArrayToArrayTodos } = require('../helpers')
const { askChatGpt, defaultPromts } = require('../chatgqt')
const Todo = require('../mongo/models/Todo')

class Controller {
  static async createTodo(req, res, next) {
    console.log(req.body)
    try {
      const { todos, userId } = req.body

      await Todo.insertOne({ todos, UserId: userId, updatedAt: new Date() })
      
      res.status(200).json({ message: "successfully created" })
    } catch (error) {
      next(error)
    }
  }


  static async findById(req, res, next) {
    console.log(req.params)
    try {
      const { userId } = req.params

      if (isNaN(+userId)) throw { message: 'Params Number' }

      let todo = await Todo.findOne({
        UserId: +userId
      })

      /* istanbul ignore next */
      if (!todo || new Date().getDay() !== todo.updatedAt.getDay()) {
        const response = await askChatGpt(defaultPromts, 0.5)
        const newTodo = convertArrayToArrayTodos(JSON.parse(response.choices[0].text))

        const result = await Todo.findOneAndUpdate(
          { UserId: +userId },
          { $set: { todos: newTodo, updatedAt: new Date() } },
          { upsert: true, returnDocument: 'after' }
        )

        todo = result.value
      }

      res.status(200).json(todo)
    } catch (error) {
      next(error)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const { userId } = req.params
      const { todos } = req.body

      let todo = await Todo.findOne({
        UserId: +userId
      })

      if (!todo) throw { message: 'Not Found' }

      await Todo.updateOne({ UserId: +userId }, { $set: { todos } })

      res.status(200).json({ message: "successfully updated" })
    } catch (error) {
      next(error)
    }
  }
  static async deleteTodo(req, res, next) {
    try {
      const { userId } = req.params

      let todo = await Todo.findOne({
        UserId: +userId
      })

      if (!todo) throw { message: 'Not Found' }

      await Todo.deleteOne({ UserId: +userId })

      res.status(200).json({ message: "successfully deleted" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller