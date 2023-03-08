const {
  User,
  AdminPost,
  CounselorSubmission,
  Report,
  sequelize,
} = require("../models");
const request = require("supertest");
const app = require("../app");
const { connect, ForumPost, ForumComment } = require("../mongo");

let postId;
let commentId;
beforeAll(async () => {
  try {
    connect()
    await User.create({
      id: 3,
      name: "admin1",
      email: "admin1@gmail.com",
      gender: "F",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg",
      role: "superadmin",
      helpful: 4,
    });
    await User.create({
      id: 4,
      name: "conselor",
      email: "conselor@gmail.com",
      gender: "F",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg",
      role: "counselor",
      helpful: 4,
    });
    await ForumPost.insertOne({
      title: "POST TEST",
      images: ["1"],
      caption: "CAPTION TEST",
      UserId: 4,
      helpful: [],
      createdAt: new Date(),
    });
    let allPost = await ForumPost.find().toArray()
    postId = await allPost[0]._id.toString()
    await ForumComment.insertOne({
      forumPostId: postId,
      text : 'comments',
      UserId : 2,
      helpful:[],
      createdAt: new Date(),
    });

    let allComments = await ForumComment.find({
      forumPostId: postId,
    }).toArray();
    commentId =  allComments[0]._id.toString();
  } catch (error) {
    console.log(error, "ini errornya");
  }
});

afterAll(async () => {
  // await disconnect();
  await sequelize.queryInterface.bulkDelete(
    "Users",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  await sequelize.queryInterface.bulkDelete(
    "Reports",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe("for comments", () => {
    // get comments by posts id 200
    it("Successfully get comments by posts id", async () => {
      const response = await request(app).get(`/posts/${postId}/comments`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toBeInstanceOf(Object);
      expect(response.body[0]).toHaveProperty("_id", expect.any(String));
      expect(response.body[0]).toHaveProperty("text", expect.any(String));
      expect(response.body[0]).toHaveProperty("forumPostId", expect.any(String));
      expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    });
  
  // get comment id 200
  it("Successfully get comment by id", async () => {
    const response = await request(app).get("/comments/" + commentId);
    await request(app).get("/comments/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("text", expect.any(String));
    expect(response.body).toHaveProperty("forumPostId", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
  });

  //! get post id 500
  it("failed get comment by id", async () => {
    const response = await request(app).get("/posts/6405e0b39a609fd6ac9de05p");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

  // put comment id 200
  it("Successfully put comment by id", async () => {
    const response = await request(app)
      .put(`/comments/` + commentId)
      .send({
        text: "commentar EDITED",
      });
      await request(app)
      .put(`/comments/` + 'aaaaaaaaaa')
      .send({
        text: "commentar EDITED",
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  //! put post id 500
  it("id not found", async () => {
    const response = await request(app).put(`/posts/1000`).send({
      text: "commentar EDITED",
    });
    console.log(response);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

  // create helpful by comment id 200
  it("Successfully create helpful by comment id", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}/helpful`)
      .send({
        UserId: 4,
      });
    await request(app)
      .put(`/comments/${commentId}/helpful`)
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "successfully updated");
    });
    
  // delete helpful by comment id 200
  it("Successfully delete helpful by comment id", async () => {
    const response = await request(app)
    .delete(`/comments/${commentId}/helpful`)
    .send({
      UserId: 4,
    });
    await request(app)
      .delete(`/comments/121212121212/helpful`)
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // create reports post by comment id 200
  it("Successfully create reports post  by comment id", async () => {
    const response = await request(app)
      .post(`/comments/${commentId}/report`)
      .send({
        UserId: 4,
        note: "annoying",
      });
      await request(app)
      .post(`/comments/${commentId}/report`)
      
    console.log(response.body);
    console.log(commentId);
    console.log(postId,"<<<<<<<");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully reported");
  });

  // delete comment id 200
  it("Successfully delete comment by id", async () => {
    const response = await request(app).delete(`/comments/` + commentId);
    await request(app).delete(`/comments/` + 'manshakalaor');
    await request(app).delete(`/comments/` + 111);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "successfully deleted");
  });


});

describe("for posts", () => {
  // posts 200
  it("Successfully read posts", async () => {
    const response = await request(app).get("/posts");
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.dataPage).toBeInstanceOf(Object);
    expect(response.body.dataPage).toHaveProperty(
      "totalPage",
      expect.any(Number)
    );
    expect(response.body.dataPage).toHaveProperty(
      "currentPage",
      expect.any(Number)
    );
    expect(response.body.dataPage).toHaveProperty(
      "nextPage",
      expect.any(Boolean)
    );
    expect(response.body.dataPage).toHaveProperty(
      "prevPage",
      expect.any(Boolean)
    );
    expect(response.body.result).toBeInstanceOf(Array);
    expect(response.body.result[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body.result[0]).toHaveProperty("title", expect.any(String));
    expect(response.body.result[0]).toHaveProperty(
      "UserId",
      expect.any(Number)
    );
  });

  // post 201
  it("Successfully post posts", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Mental health: build predictive models to steer policy",
        images: ["1", "2"],
        caption:
          "Combine economic, social and medical data to forecast need and design services to address the growing crisis.",
        UserId: 4,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "successfully created");
  });

  //! post 400 title is required
  it("title is required", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        images: ["1", "2"],
        caption:
          "Combine economic, social and medical data to forecast need and design services to address the growing crisis.",
        UserId: 3,
      });
      console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Title must be a string and is required");
  });



  // get posts id 200
  it("Successfully get posts by id", async () => {
    const response = await request(app).get("/posts/" + postId);
    console.log(postId);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
  });

  //! get post id 500
  it("posts id not found", async () => {
    const response = await request(app).get("/posts/6405e0b39a609fd6ac9de05p");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

  // put post id 200
  it("Successfully put posts by id", async () => {
    const response = await request(app)
      .put(`/posts/` + postId)
      .send({
        title: "EDITED",
        images: ["1", "2"],
        caption: "TEST EDIT TEST EDIT",
        UserId: 3,
      });
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  //! put post id 500
  it("id not found", async () => {
    const response = await request(app).put(`/posts/1000`).send({
      title: "EDITED",
      images: ["1", "2"],
      caption: "TEST EDIT TEST EDIT",
      UserId: 3,
    });
    console.log(response);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

 

  // post comments by posts id 200
  it("Successfully post comments by posts id", async () => {
    const response = await request(app).post(`/posts/${postId}/comments`).send({
      text: "commentar",
      UserId: 4,
      helpful: [],
    });
    await request(app).post(`/posts/${postId}/comments`)
        expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully created");
  });

  // create helpful by posts id 200
  it("Successfully create helpful by posts id", async () => {
    const response = await request(app).put(`/posts/${postId}/helpful`).send({
      UserId: 3,
    });
    await request(app).put(`/posts/${postId}/helpful`)
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // delete helpful by posts id 200
  it("Successfully delete helpful by posts id", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}/helpful`)
      .send({
        UserId: 3,
      });
      await request(app)
      .delete(`/posts/${postId}/helpful`)
    
          expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // create reports post by posts id 200
  it("Successfully create reports post  by posts id", async () => {
    const response = await request(app).post(`/posts/${postId}/report`).send({
      UserId: 3,
      note: "annoying",
    });
    await request(app).post(`/posts/${postId}/report`)
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully reported");
  });

   // delete post id 200
   it("Successfully delete posts by id", async () => {
    const response = await request(app).delete(`/posts/` + postId);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "successfully deleted");
  });

  //! delete post id 500
  it("Unsuccess delete posts by id, because id not found", async () => {
    const response = await request(app).delete(`/posts/10`);
    console.log(response);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

});
