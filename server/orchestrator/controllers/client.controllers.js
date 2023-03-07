const {
  adminAPI,
  scheduleAPI,
  userAPI,
  chatAPI,
  forumAPI,
} = require("../helpers/axios");
const redis = require("../helpers/redis");

const HOME = "client:home";
const COUNSELOR = "client:counselor";

class ClientController {
  static async getHome(req, res, next) {
    try {
      const cached = await redis.get(HOME);
      if (cached) {
        return res.status(200).json(JSON.parse(cached));
      }
      const { data: podcasts } = await adminAPI.get("/posts", {
        params: { type: "podcast" },
      });
      const { data: articles } = await adminAPI.get("/posts", {
        params: { type: "article" },
      });
      const { data: videos } = await adminAPI.get("/posts", {
        params: { type: "video" },
      });

      const result = { podcasts, articles, videos };
      await redis.set(HOME, JSON.stringify(result));
      await redis.expire(HOME, 300);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getSchedule(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data: user } = await userAPI.post("/verify", { access_token });
      const { data: schedules } = await scheduleAPI.get(
        "/schedules/user/" + user.id
      );
      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCounselor(req, res, next) {
    try {
      const cache = await redis.get(COUNSELOR);
      if (cache) {
        return res.status(200).json(JSON.parse(cache));
      }
      const { data: counselors } = await adminAPI.get("/counselors");
      await redis.set(COUNSELOR, JSON.stringify(counselors));
      await redis.expire(COUNSELOR, 300);

      res.status(200).json(counselors.filter((el) => el.status !== "pending"));
    } catch (error) {
      next(error);
    }
  }

  static async getCounselorByid(req, res, next) {
    try {
      const { counselorId } = req.params

      const { data: user } = await userAPI.get(`users/${counselorId}`)
      const { data: counselor } = await userAPI.get(`/submissions/${counselorId}`)
      const { data: availability } = await scheduleAPI.get(
        `/schedules/counselor/${counselorId}/availability`
      )

      res.status(200).json({ user, counselor, availability })
    } catch (error) {
      next(error);
    }
  }

  static async getChatWithLivy(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data: user } = await userAPI.post("/verify", { access_token });
      const { data: chat } = await chatAPI.get("/chats/" + user.id + "/livy");
      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }

  static async chatWithLivy(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { text } = req.body;
      const { data: user } = await userAPI.post("/verify", { access_token });
      const { data: reply } = await chatAPI.post(
        "/chats/" + user.id + "/livy",
        {
          text,
          sender: { UserId: user.id, name: user.name },
        }
      );
      res.status(200).json(reply);
    } catch (error) {
      next(error);
    }
  }

  static async getForumTop(req, res, next) {
    try {
      let result = await forumAPI.get("/posts");
      let sorted = result.data.result.sort(
        (a, b) => b.helpful.length - a.helpful.length
      );
      // console.log(result.data);
      res.status(200).json(sorted);
    } catch (error) {
      next(error);
    }
  }

  static async getForumNew(req, res, next) {
    try {
      let result = await forumAPI.get("/posts");
      let sorted = result.data.result.reverse();
      // console.log(result);
      res.status(200).json(sorted);
    } catch (error) {
      next(error);
    }
  }

  static async createForumPost(req, res, next) {
    try {
      console.log("UHUY");
      const { access_token } = req.headers;
      const { data: user } = await userAPI.post("/verify", { access_token });
      // console.log(user);
      let { title, images = [], caption } = req.body;
      // console.log(req.body);
      let result = await forumAPI.post("/posts", {
        title,
        images,
        caption,
        UserId: user.id,
      });
      res.status(200).json(result.data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getForumPostById(req, res, next) {
    try {
      let { postId } = req.params;
      let result = await forumAPI.get(`/posts/${postId}`);
      let dataUser = await userAPI.get(`/users/${result.data.UserId}`);

      res.status(200).json({ post: result.data, user: dataUser.data });
    } catch (error) {
      next(error);
    }
  }

  static async updateForumPostById(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { data: user } = await userAPI.post("/verify", { access_token });
      let { postId } = req.params;
      let { title, images = [], caption } = req.body;
      let result = await forumAPI.put(`/posts/${postId}`, {
        title,
        images,
        caption,
        UserId: user,
      });
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteForumPostById(req, res, next) {
    try {
      let { postId } = req.params;
      let result = await forumAPI.delete(`/posts/${postId}`);
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async getForumCommentByPostId(req, res, next) {
    try {
      let { postId } = req.params;
      let comments = await forumAPI.get(`/posts/${postId}/comments`);
      let user = comments.data.map((comment) => {
        return userAPI.get(`/users/${comment.UserId}`);
      });
      const result = (await Promise.all(user)).map((user, index) => {
        return { user: user.data, comment: comments.data[index] };
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createHelpfulPost(req, res, next) {
    try {
      let { postId } = req.params;
      let result = await forumAPI.put(`/posts/${postId}/helpful`);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async createReportPost(req, res, next) {
    try {
      let { postId } = req.params;
      let result = await forumAPI.put(`/posts/${postId}/report`);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async createHelpfulComment(req, res, next) {
    try {
      let { commentId } = req.params;
      let result = await forumAPI.put(`/comments/${commentId}/helpful`);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async createReportComment(req, res, next) {
    try {
      let { commentId } = req.params;
      let result = await forumAPI.put(`/comments/${commentId}/report`);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createComment(req, res, next) {
    try {
      const { access_token } = req.headers;
      console.log(access_token);
      const { data: user } = await userAPI.post("/verify", { access_token });
      console.log(user);
      let { text } = req.body;
      let { postId } = req.params;
      let result = await forumAPI.post(`/posts/${postId}/comments`,{
        text, UserId:user.id
      });
      console.log(result.data);
      res.status(200).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  static async createSchedule(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { CounselorId, time, note } = req.body;
      const { data: user } = await userAPI.post("/verify", { access_token });
      const { data: schedules } = await scheduleAPI.post(
        "/schedules/user/" + user.id,
        { CounselorId, time, note }
      );
      res.status(200).json(schedules);
    } catch (error) {
      next(error);
    }
  }
  static async callback(req, res,next){
    const {external_id} = req.body
    const token = req.headers['x-callback-token']
    console.log(req.body)
    try {
      if(process.env.NODE_ENV === 'production' && token !== process.env.CALLBACK_TOKEN ){  
      throw {name: "InvalidToken"}
      }
      const response = await scheduleAPI.patch('/schedules/paid/'+external_id.split('-')[1])
      res.status(200).json({'message':'Paid Succesfully'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClientController;
