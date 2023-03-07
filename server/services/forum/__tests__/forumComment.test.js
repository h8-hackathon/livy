/* istanbul ignore file */
const request = require("supertest");
const app = require("../app");
const { connect, ForumPost, ForumComment } = require("../mongo");

let postId;
let commentId;
beforeAll(async () => {
  try {
    connect();
    await ForumPost.insertOne({
      title: "POST TEST",
      images: ["1"],
      caption: "CAPTION TEST",
      UserId: 1,
      helpful: [],
      createdAt: new Date(),
    });
    let allPost = await ForumPost.find().toArray();
    postId = await allPost[0]._id.toString();
    await ForumComment.insertOne({
      forumPostId: postId,
      text: "comments",
      UserId: 1,
      helpful: [],
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

});

describe("for posts", () => {
  // get comment id 200
  it("Successfully get comment by id", async () => {
    const response = await request(app).get("/comments/" + commentId);
    console.log(commentId);
    console.log(response.body);
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
    console.log(response);
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
        UserId: 1,
      });
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
        UserId: 1,
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully updated");
  });

  // create reports post by comment id 200
  it.only("Successfully create reports post  by comment id", async () => {
    const response = await request(app)
      .post(`/comments/${commentId}/report`)
      .send({
        UserId: 2,
        note: "annoying",
      });
    console.log(response.body);
    console.log(commentId);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "successfully reported");
  });

  // delete comment id 200
  it("Successfully delete comment by id", async () => {
    const response = await request(app).delete(`/comments/` + commentId);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "successfully deleted");
  });


});
