/* istanbul ignore file */
const { connect, disconnect, ForumPost, ForumComment } = require("../mongo");
const { ObjectId } = require("mongodb");
const connectDB = connect();
const { User, Report } = require("../models");
const { sequelize } = require("../models/");
class forumPostController {
  static async getAllPost(req, res, next) {
    try {
      let { page = 1, sortBy = "_id", limit = 10 } = req.query;
      console.log(page, sortBy, limit);
      let allPost = await ForumPost.find().toArray();
      let totalPage = Math.ceil(allPost.length / limit);
      console.log(totalPage, "<<<<<<<<< total page");
      console.log(allPost.length, "<<<<<<<<< all post length");
      if (page > totalPage) {
        page = totalPage;
      }
      if (page < 1) {
        page = 1;
      }
      if (sortBy !== "_id" || sortBy !== "title" || sortBy !== "createdAt") {
        sortBy = "_id";
      }
      if (Number(limit) > allPost.length) {
        limit = allPost.length;
      }
      console.log(limit, "<<<<<<<<< limit");

      let sortOption = `{ ${sortBy} : 1}`;
      let limitOption = Number(limit);
      console.log(limitOption, "<<<<<<<<< limit option");
      let skipOption = Number(limit) * (page - 1);
      let nextPage = true;
      let prevPage = false;
      page == totalPage ? (nextPage = false) : (nextPage = true);
      page <= totalPage && page > 1 ? (prevPage = true) : (prevPage = false);

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
    } catch (error) {
      next(error);
      res.status(500).json(error);
    }
  }
  static async createPost(req, res, next) {
    try {
      let { title, images = [], caption, UserId } = req.body;
      // console.log(req.body);
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
      if (postById) {
        res.status(200).json(postById);
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
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
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async deletePostById(req, res, next) {
    try {
      let { postId } = req.params;
      let result = await ForumPost.deleteOne({ _id: new ObjectId(postId) });
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "successfully deleted",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async getCommentByPostId(req, res, next) {
    try {
      let { postId } = req.params;
      let comments = await ForumComment.find({ forumPostId: postId }).toArray();
      console.log(comments);
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async createComment(req, res, next) {
    try {
      let { postId } = req.params;
      let { text, UserId, helpful =[] } = req.body;
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
      if (!helpfulAdded.includes(UserId)) {
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
      }
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
      );
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
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
      if (helpfulAdded.includes(UserId)) {
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
      }
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
      );
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async createReportPost(req, res, next) {
    try {
      let { postId } = req.params;
      let { UserId, note } = req.body;
      let user = await User.findByPk(UserId);

      if (!user) {
        res.status(404).json({ message: "No user matched the query" });
      } else {
        let result = await Report.create({ note, postId, ReporterId: UserId });
        if (result) {
          res.status(201).json({
            message: "successfully reported",
          });
          console.log(result.dataValues);
        } else {
          res.status(404).json({ message: "No documents matched the query" });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = forumPostController;
