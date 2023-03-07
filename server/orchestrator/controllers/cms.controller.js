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
      for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        let { data: perUser } = await userAPI.get("/users/" + element.UserId);
        if (perUser) {
          element.name = perUser.name;
          element.email = perUser.email;
        }
        console.log(element);
      }
      await redis.set(POSTS, JSON.stringify(posts));
      //   await redis.del(POSTS)
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const { title, url, caption, type, UserId } = req.body;
 
      await adminAPI({
        method: "post",
        url: "/posts/",
        data: {
          title,
          url,
          caption,
          type,
          UserId,
        },
      });
      await redis.del(POSTS);
      res.status(200).json({ message: "data successfully added" });
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
      // const { title, url, caption, type, UserId } = req.body;
      // const { data: post } = await adminAPI.get("/posts/" + id);
      // const { data: user } = await userAPI.get("/users/" + UserId);
      // if (!post || !user) {
      //   throw { name: "NotFound" };
      // }
      await adminAPI.put('/posts/' + id, req.body);
      await redis.del(POSTS);
      res.status(200).json({ message: "data successfully updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const { data: post } = await adminAPI.get("/posts/" + id);
      if (!post) {
        throw { name: "NotFound" };
      }
      await adminAPI.delete("/posts/" + id);
      await redis.del(POSTS);
      res.status(200).json({ message: "data successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCounselor(req, res, next) {
    try {
      const { data: counselors } = await adminAPI.get("/counselors");
      res.status(200).json(counselors.filter((el) => el.status === "pending"));
    } catch (error) {
      next(error);
    }
  }

  static async acceptCounselor(req, res, next) {
    console.log(req.body)
    try {
      const { submissionId } = req.params;
      await userAPI.put(`/counselor/${submissionId}/submissions`, { status: "accepted" });
      res.status(200).json({ message: "data successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async getForumReport(req, res, next) {
    try {
      const { data: reports } = await adminAPI.get("/reports");
      const posts = [];
      const comments = [];
      for (let i = 0; i < reports.length; i++) {
        const element = reports[i];
        if (element.commentId) {
          comments.push(element);
        } else {
          posts.push(element);
        }
      }
      const groupedPosts = {};
      const groupedComments = {};
      for (let i = 0; i < posts.length; i++) {
        const element = posts[i];
        if (groupedPosts[element.postId]) {
          groupedPosts[element.postId].push(element);
        } else {
          groupedPosts[element.postId] = [element];
        }
      }

      for (let i = 0; i < comments.length; i++) {
        const element = comments[i];
        if (groupedComments[element.commentId]) {
          groupedComments[element.commentId].push(element);
        } else {
          groupedComments[element.commentId] = [element];
        }
      }

      const postIds = Object.keys(groupedPosts);
      const commentIds = Object.keys(groupedComments);
      const postReports = [];
      const commentReports = [];
      for (let i = 0; i < postIds.length; i++) {
        const element = postIds[i];
        const { data: post } = await forumAPI.get(`/posts/${element}`);
        const { data: user } = await userAPI.get(`/users/${post.UserId}`);
        post.author = user;
        post.reports = groupedPosts[element].length;
        postReports.push(post);
      }

      for (let i = 0; i < commentIds.length; i++) {
        const element = commentIds[i];
        const { data: comment } = await forumAPI.get(`/comments/${element}`);
        const { data: user } = await userAPI.get(`/users/${comment.UserId}`);
        comment.author = user;
        comment.reports = groupedComments[element].length;
        commentReports.push(comment);
      }

      res.status(200).json({ postReports, commentReports });
    } catch (error) {
      next(error);
    }
  }
        

  static async rejectCounselor(req, res, next) {
    try {
      const { submissionId } = req.params;
      const { data: counselors } = await adminAPI.get("/counselors");
      const counselor = counselors.find((el) => el.id == submissionId);
      await userAPI.delete(`/users/${counselor.UserId}`);
      res.status(200).json({ message: "data successfully updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReportedPost(req, res, next) {
    try {
      const { postId } = req.params;
      await forumAPI.delete(`/posts/${postId}`);
      await adminAPI.delete(`/reports/post/${postId}`);
      res.status(200).json({ message: "data successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async ignoreReportedPost(req, res, next) {
    try {
      const { postId } = req.params;
      await adminAPI.delete(`/reports/post/${postId}`);
      res.status(200).json({ message: "data successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteReportedComment(req, res, next) {
    try {
      const { commentId } = req.params;
      await forumAPI.delete(`/comments/${commentId}`);
      await adminAPI.delete(`/reports/comment/${commentId}`);
      res.status(200).json({ message: "data successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async ignoreReportedComment(req, res, next) {
    try {
      const { commentId } = req.params;
      await adminAPI.delete(`/reports/comment/${commentId}`);
      res.status(200).json({ message: "data successfully deleted" });
    } catch (error) {
      next(error);
    }
  }

  // get /users from userAPI with type admin
  static async getAllAdmin(req, res, next) {
    try {
      const { data: admins } = await userAPI.get("/users?type=admin");
      res.status(200).json(admins);
    } catch (error) {
      next(error);
    }
  }

  // post /users/admin from userAPI
  static async createAdmin(req, res, next) {
    console.log(req.body)
    try {
      /* const { name, email } = req.body; */
      const { data: admin } = await userAPI.post("/users/admin", {
        ...req.body
      });
      res.status(201).json(admin);
    } catch (error) {
      next(error);
    }
  }

  // get /users/:id from userAPI with type admin
  static async getAdminById(req, res, next) {
    try {
      const { id } = req.params;
      const { data: admin } = await userAPI.get(`/users/${id}`);
      res.status(200).json(admin);
    } catch (error) {
      next(error);
    }
  }

  // put /users/:id from userAPI with type admin
  static async updateAdmin(req, res, next) {
    console.log(req.body)
    try {
      const { id } = req.params;
      const { data: admin } = await userAPI.put(`/users/${id}`, req.body);
      res.status(200).json(admin);
    } catch (error) {
      next(error);
    }
  }

  // delete /users/:id from userAPI with type admin
  static async deleteAdmin(req, res, next) {
    try {
      const { id } = req.params;
      const { data: admin } = await userAPI.delete(`/users/${id}`);
      res.status(200).json(admin);
    } catch (error) {
      next(error);
    }
  }



}

module.exports = CMSController;
