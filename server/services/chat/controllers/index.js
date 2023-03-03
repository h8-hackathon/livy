const Chat = require('../mongo/models/Chat')

class Controller {
  static async listChat(req, res, next) {
    try {
      const { userId } = req.params

      let chat = await Chat.findOne({
        UserId: +userId
      })

      if (!chat) throw { name: 'NotFound' }

      res.status(200).json(chat)
    } catch (error) {
      next(error)
    }
  }

  static async createChat(req, res, next) {
    try {
      // const { text, sender } = req.body
      // const { userId } = req.params

      // await Chat.insertOne({ userId  })

      // res.status(200).json({ message: "successfully created" })

      // if (!chat) throw { name: 'NotFound' }

      res.status(200).json({ "message": "successfully created" })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller