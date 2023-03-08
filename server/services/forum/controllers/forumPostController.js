
const { connect, disconnect, ForumPost, ForumComment } = require("../mongo");
const { ObjectId } = require("mongodb");
const connectDB = connect();
const { User, Report } = require("../models");
const { sequelize } = require("../models/");
class forumPostController {
  static async getAllPost(req, res, next) {
    try {
      let { page = 1, sortBy = "_id", limit = 10 } = req.query;
      let limitTemp;
      let sortByTemp = sortBy;
      let pageTemp;
      let allPost = await ForumPost.find().toArray();
      let totalPage = Math.ceil(allPost.length / limit);
      if (page > totalPage) {
        pageTemp = totalPage;
      } else if (page < 1) {
        pageTemp = 1;
      } else {
        pageTemp = page;
      }


      if (sortBy !== "_id" || sortBy !== "title" || sortBy !== "createdAt") {
        sortByTemp = "_id";
      }
      Number(limit) > Number(allPost.length)
        ? (limitTemp = allPost.length)
        : (limitTemp = limit);

      let sortOption = `{ ${sortByTemp} : 1}`;
      let limitOption = Number(limitTemp);
      let skipOption = Number(limitTemp) * (pageTemp - 1);
      let nextPage = true;
      let prevPage = false;
      pageTemp == totalPage ? (nextPage = false) : (nextPage = true);
      pageTemp <= totalPage && pageTemp > 1
        ? (prevPage = true)
        : (prevPage = false);

      let dataPage = {
        totalPage,
        currentPage: Number(page),
        nextPage,
        prevPage,
      };
      let result = await ForumPost.find()
        .sort(sortOption)
        .skip(skipOption)
        .limit(limitOption)
        .toArray();
      console.log(result.length, "<<<<<<<<< total data");
      res.status(200).json({ dataPage, result });
    } catch (error) {}
  }
  static async createPost(req, res, next) {
    try {
      let { title, images, caption, UserId } = req.body;
      await ForumPost.insertOne({
        title,
        images,
        caption,
        UserId: +UserId,
        helpful: [],
        createdAt: new Date(),
      });
      res.status(201).json({
        message: "successfully created",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getPostById(req, res, next) {
    try {
      let { postId } = req.params;
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      console.log(postById);
      res.status(200).json(postById);
    } catch (error) {
      next(error);
    }
  }
  static async updatePostById(req, res, next) {
    try {
      //   await connectDB
      let { postId } = req.params;
      console.log(postId);
      let { title, images, caption, UserId } = req.body;
      console.log(title, images, caption, UserId);
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { title, images, caption, UserId } }
      );
      res.status(200).json({
        message: "successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deletePostById(req, res, next) {
    try {
      let { postId } = req.params;
      await ForumPost.deleteOne({ _id: new ObjectId(postId) });
      res.status(200).json({
        message: "successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCommentByPostId(req, res, next) {
    try {
      let { postId } = req.params;
      let comments = await ForumComment.find({ forumPostId: postId }).toArray();
      res.status(200).json(comments);
    } catch (error) {}
  }
  static async createComment(req, res, next) {
    try {
      let { postId } = req.params;
      let { text, UserId, helpful = [] } = req.body;
      await ForumComment.insertOne({
        forumPostId: postId,
        text,
        UserId,
        helpful,
        createdAt: new Date(),
      });
      res.status(201).json({
        message: "successfully created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async createHelpfulPost(req, res, next) {
    try {
      let { postId } = req.params;
      // console.log(postId);
      let { UserId } = req.body;
      // console.log(UserId);
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      let helpfulDataBefore = postById.helpful;
      let helpfulAdded = helpfulDataBefore;
      const userPostgres = await User.findOne({ where: { id: UserId } });
      let helpfulAddedtoPostgres = userPostgres.helpful;
      // if (!helpfulAdded.includes(UserId)) {
      helpfulAdded.push(UserId);
      helpfulAddedtoPostgres++;
      // console.log(helpfulAddedtoPostgres);
      await User.update(
        { helpful: helpfulAddedtoPostgres },
        {
          where: {
            id: UserId,
          },
        }
      );
      // }
      await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
      );
      res.status(200).json({
        message: "successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteHelpfulPost(req, res, next) {
    try {
      let { postId } = req.params;
      // console.log(postId);
      let { UserId } = req.body;
      // console.log(UserId);
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      let helpfulDataBefore = postById.helpful;
      let helpfulAdded = helpfulDataBefore;
      const userPostgres = await User.findOne({ where: { id: UserId } });
      let helpfulAddedtoPostgres = userPostgres.helpful;
      // if (helpfulAdded.includes(UserId)) {
      var temp = helpfulAdded.filter(function (value, index, arr) {
        return value != UserId;
      });
      helpfulAdded = temp;
      helpfulAddedtoPostgres--;
      // console.log(helpfulAddedtoPostgres);
      await User.update(
        { helpful: helpfulAddedtoPostgres },
        {
          where: {
            id: UserId,
          },
        }
      );
      // }
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
      );
      res.status(200).json({
        message: "successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }
  static async createReportPost(req, res, next) {
    try {
      let { postId } = req.params;
      let { UserId, note } = req.body;
      let user = await User.findByPk(UserId);

      await Report.create({ note, postId, ReporterId: UserId });
      res.status(201).json({
        message: "successfully reported",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = forumPostController;
