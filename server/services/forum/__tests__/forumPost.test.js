const request = require("supertest");
const app = require("../app");
const {connect,  ForumPost, ForumComment } = require("../mongo");

let postId;
beforeAll(async () => {
  try {    
    connect()
    await ForumPost.insertOne({
      title: "POST TEST",
      images: ["1"],
      caption: "CAPTION TEST",
      UserId: 1,
      helpful: [],
      createdAt: new Date(),
    });
    let allPost = await ForumPost.find().toArray()
    postId = await allPost[0]._id.toString()
    await ForumComment.insertOne({
      forumPostId: postId,
      text : 'comments',
      UserId : 1,
      helpful:[],
      createdAt: new Date(),
    });

  } catch (error) {
    console.log(error, "ini errornya");
  }
});

afterAll(async () => {
  // await disconnect();
});

describe.skip("for posts", () => {
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
        UserId: 1,
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
        UserId: 1,
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
        UserId: 1,
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
      UserId: 1,
    });
    console.log(response);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

 
  // get comments by posts id 200
  it("Successfully get comments by posts id", async () => {
    const response = await request(app).get(`/posts/${postId}/comments`);
    console.log(postId);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("text", expect.any(String));
    expect(response.body[0]).toHaveProperty("forumPostId", expect.any(String));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
  });

  // post comments by posts id 200
  it("Successfully post comments by posts id", async () => {
    const response = await request(app).post(`/posts/${postId}/comments`).send({
      text: "commentar",
      UserId: 2,
      helpful: [],
    });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully created");
  });

  // create helpful by posts id 200
  it("Successfully create helpful by posts id", async () => {
    const response = await request(app).put(`/posts/${postId}/helpful`).send({
      UserId: 1,
    });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // delete helpful by posts id 200
  it("Successfully delete helpful by posts id", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}/helpful`)
      .send({
        UserId: 1,
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // create reports post by posts id 200
  it("Successfully create reports post  by posts id", async () => {
    const response = await request(app).post(`/posts/${postId}/report`).send({
      UserId: 2,
      note: "annoying",
    });
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
