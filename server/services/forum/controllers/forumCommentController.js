const { connect, disconnect, ForumPost, ForumComment } = require('../mongo')
const { ObjectId } = require('mongodb')
const connectDB = connect()
const { sequelize } = require('../models')
const { User, Report } = require('../models')
class forumCommentController {
  static async updateComment(req, res) {
    try {
      let { postId, commentId } = req.params
      let { text } = req.body
      let result = await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { text } }
      )
     
        res.status(200).json({
          message: 'successfully updated',
        })
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
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
      res.status(500).json({ message: 'Internal Server Error' })
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
      // if (!helpfulAdded.includes(UserId)) {
        helpfulAdded.push(UserId)
        helpfulAddedtoPostgres++
        await User.update(
          { helpful: helpfulAddedtoPostgres },
          {
            where: {
              id: UserId,
            },
          }
        )
      // }
    await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { helpful: helpfulAdded } }
      )
        res.status(200).json({
          message: 'successfully updated',
        })
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  static async deleteHelpfulComment(req, res) {
    try {
      let { commentId } = req.params
      let { UserId } = req.body
      let commentById = await ForumComment.findOne({
        _id: new ObjectId(commentId),
      })
      let helpfulDataBefore = commentById.helpful
      let helpfulAdded = helpfulDataBefore
      let userPostgres = await User.findOne({ where: { id: UserId } })
      let helpfulAddedtoPostgres = userPostgres.helpful
      // if (helpfulAdded.includes(UserId)) {
        let temp = helpfulAdded.filter(function (value, index, arr) {
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
      // }
      await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { helpful: helpfulAdded } }
      )
        res.status(200).json({
          message: 'successfully updated',
        })
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  static async createReportComment(req, res) {
    try {
      let { commentId } = req.params
      let { UserId, note } = req.body
      let user = await User.findByPk(UserId)
      
      
      let result = await Report.create({
        note,
        commentId,
        ReporterId: UserId,
      })
      res.status(201).json({
        message: 'successfully reported',
      })
      
      
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async getCommentById(req, res) {
    try {
      let { commentId } = req.params
      let commentById = await ForumComment.findOne({
        _id: new ObjectId(commentId),
      })
        res.status(200).json(commentById)
    
    } catch (error) {
      res.status(404).json({ message: 'No documents matched the query' })
    }
  }
}

module.exports = forumCommentController
