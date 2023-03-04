const { connect, disconnect, ForumPost, ForumComment } = require('../mongo')
const { ObjectId } = require('mongodb')
const connectDB = connect()
const { User, Report } = require('../models')
const { sequelize } = require('../models')
class forumCommentController {
  static async updateComment(req, res) {
    try {
      let { postId, commentId } = req.params
      let { text } = req.body
      let result = await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { text } }
      )
      if (result) {
        res.status(200).json({
          message: 'successfully updated',
        })
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      console.log(error)
    }
  }
  static async deleteComment(req, res) {
    try {
      let { postId, commentId } = req.params
      let result = await ForumComment.deleteOne({
        _id: new ObjectId(commentId),
      })
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: 'successfully deleted',
        })
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async createHelpfulComment(req, res) {
    try {
      let { commentId } = req.params
      // console.log(commentId);
      let { UserId } = req.body
      // console.log(UserId);
      let commentById = await ForumComment.findOne({
        _id: new ObjectId(commentId),
      })
      let helpfulDataBefore = commentById.helpful
      let helpfulAdded = helpfulDataBefore
      const userPostgres = await User.findOne({ where: { id: UserId } })
      let helpfulAddedtoPostgres = userPostgres.helpful
      if (!helpfulAdded.includes(UserId)) {
        helpfulAdded.push(UserId)
        helpfulAddedtoPostgres++
        // console.log(helpfulAddedtoPostgres);
        await User.update(
          { helpful: helpfulAddedtoPostgres },
          {
            where: {
              id: UserId,
            },
          }
        )
      }
      let result = await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { helpful: helpfulAdded } }
      )
      if (result) {
        res.status(200).json({
          message: 'successfully updated',
        })
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      console.log(error)
    }
  }
  static async deleteHelpfulComment(req, res) {
    try {
      let { commentId } = req.params
      // console.log(postId);
      let { UserId } = req.body
      // console.log(UserId);
      let commentById = await ForumComment.findOne({
        _id: new ObjectId(commentId),
      })
      let helpfulDataBefore = commentById.helpful
      let helpfulAdded = helpfulDataBefore
      const userPostgres = await User.findOne({ where: { id: UserId } })
      let helpfulAddedtoPostgres = userPostgres.helpful
      if (helpfulAdded.includes(UserId)) {
        var temp = helpfulAdded.filter(function (value, index, arr) {
          return value != UserId
        })
        helpfulAdded = temp
        helpfulAddedtoPostgres--
        // console.log(helpfulAddedtoPostgres);
        await User.update(
          { helpful: helpfulAddedtoPostgres },
          {
            where: {
              id: UserId,
            },
          }
        )
      }
      let result = await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { helpful: helpfulAdded } }
      )
      if (result) {
        res.status(200).json({
          message: 'successfully updated',
        })
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      console.log(error)
    }
  }
  static async createReportComment(req, res) {
    try {
      let { commentId } = req.params
      let { UserId, note } = req.body
      let user = await User.findByPk(UserId)

      if (!user) {
        res.status(404).json({ message: 'No user matched the query' })
      } else {
        let result = await Report.create({
          note,
          commentId,
          ReporterId: UserId,
        })
        if (result) {
          res.status(201).json({
            message: 'successfully reported',
          })
        } else {
          res.status(404).json({ message: 'No documents matched the query' })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async getCommentById(req, res) {
    try {
      let { commentId } = req.params
      let commentById = await ForumComment.findOne({
        _id: new ObjectId(commentId),
      })
      if (commentById) {
        res.status(200).json(commentById)
      } else {
        res.status(404).json({ message: 'No documents matched the query' })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = forumCommentController
