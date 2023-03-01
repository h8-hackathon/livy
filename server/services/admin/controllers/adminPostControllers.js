const { AdminPost, User } = require('../models/index');

class adminPostControllers {
  static async readPosts(req, res) {
    try {
      const posts = await AdminPost.findAll();

      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  }

  static async createPost(req, res) {
    try {
      const { id, title, url, caption, type, UserId } = req.body;

      const newPost = await AdminPost.create({ id, title, url, caption, type, UserId });

      res.status(201).json({
        message: `Success created ${newPost.title}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async readPostById(req, res) {
    try {
      const { id } = req.params;

      const findPost = await AdminPost.findByPk(+id);

      if (!findPost) {
        throw { name: 'NotFound' };
      }

      res.status(200).json(findPost);
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePostById(req, res) {
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
      console.log(error);
    }
  }

  static async deletePostById(req, res) {
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
      console.log(error);
    }
  }
}
module.exports = adminPostControllers;
