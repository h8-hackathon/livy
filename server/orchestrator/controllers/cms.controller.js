const { adminAPI, userAPI, forumAPI } = require("../helpers/axios");
const redis = require("../helpers/redis");

const POSTS = "cms:posts";

class CMSController {
  static async getAllPost(req, res, next) {
    try {
      const cached = await redis.get(POSTS);
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }
      const { data: posts } = await adminAPI.get("/posts");
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let { data: perUser } = await userAPI.get("/users/" + element.UserId);
        if (perUser) {
          console.log(perUser);
          element.name = perUser.name;
          element.email = perUser.email;
        }
        console.log(element);
      }
      await redis.set(POSTS, JSON.stringify(posts));
      //   await redis.del(POSTS)
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req, res, next) {
    try {
      const { id } = req.params;
      const { data: post } = await adminAPI.get("/posts/" + id);
      const { data: user } = await userAPI.get("/users/" + post.UserId);
      post.name = user.name;
      post.email = user.email;
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, url, caption, type, UserId } = req.body;
      const { data: post } = await adminAPI.get("/posts/" + id);
      const { data: user } = await userAPI.get("/users/" + UserId);
      if (!post || !user) {
        throw { name: "NotFound" };
      }
      await adminAPI({
        method: "put",
        url: "/posts/" + id,
        data: {
          title,
          url,
          caption,
          type,
          UserId,
        },
      });
      await redis.del(POSTS);
      res.status(200).json({ message: "data successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CMSController;
