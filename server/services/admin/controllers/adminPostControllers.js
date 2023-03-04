const { AdminPost, User } = require('../models/index');

class adminPostControllers {
  static async readPosts(req, res, next) {
    try {
      const { type } = req.query;

      if (!req.query.type) {
        const posts = await AdminPost.findAll();
        res.status(200).json(posts);
      } else {
        const posts = await AdminPost.findAll({
          where: {
            type,
          },
        });
        res.status(200).json(posts);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { id, title, url, caption, type, UserId } = req.body;

      const newPost = await AdminPost.create({ id, title, url, caption, type, UserId });

      res.status(201).json({
        message: `Success created ${newPost.title}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readPostById(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, 'ini id');
      const findPost = await AdminPost.findByPk(+id);

      if (!findPost) {
        throw { name: 'NotFound' };
      }

      res.status(200).json(findPost);
    } catch (error) {
      next(error);
    }
  }

  static async updatePostById(req, res, next) {
    try {
      const { id } = req.params;
      const { title, url, caption, type, UserId } = req.body;

      let findPost = await AdminPost.findByPk(+id);

      if (!findPost) {
        throw { name: 'NotFound' };
      }

      await AdminPost.update(
        {
          title,
          url,
          caption,
          type,
          UserId,
        },
        { where: { id } }
      );

      findPost = await AdminPost.findByPk(+id);

      res.status(200).json({
        message: `Success updated ${findPost.title}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePostById(req, res, next) {
    try {
      const { id } = req.params;

      const findPost = await AdminPost.findByPk(+id);

      if (!findPost) {
        throw { name: 'NotFound' };
      }

      await AdminPost.destroy({
        where: { id },
      });

      res.status(200).json({
        message: `Success deleted ${findPost.title}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = adminPostControllers;
