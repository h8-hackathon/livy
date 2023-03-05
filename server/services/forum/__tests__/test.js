const request = require("supertest");
const app = require("../app");
const { connect, disconnect, ForumPost, ForumComment } = require("../mongo");
const { ObjectId } = require("mongodb");
const { User, Report } = require("../models");
const { sequelize } = require("../models");
let postId = "64046f090b6db0204b94e9f8";

beforeAll(async () => {
  try {
    connect();
  } catch (error) {
    console.log(error, "ini errornya");
  }
});

afterAll(async () => {
  disconnect();
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
        title: "Mental health: build predictive models to steer policy",
        images: ["1", "2"],
        caption:
          "Combine economic, social and medical data to forecast need and design services to address the growing crisis.",
        // UserId: 1,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "title is required");
  });

  //! post 400 type is required
  it("type is required", async () => {
    const response = await request(app).post("/posts").send({
      id: 6,
      title: "Mental health: build predictive models to steer policy",
      url: "https://www.nature.com/articles/d41586-021-02581-9",
      caption:
        "Combine economic, social and medical data to forecast need and design services to address the growing crisis.",
      UserId: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "type is required");
  });

  // get posts id 200
  it("Successfully get posts by id", async () => {
    const response = await request(app).get("/posts/" + postId);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty(
      "UserId",
      expect.any(Number)
    );
  });

  //! get post id 404
  it("posts id not found", async () => {
    const response = await request(app).get("/posts/1000");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "not found");
  });

  // put post id 200
  it("Successfully put posts by id", async () => {
    
    const response = await request(app).put(`/posts/`+postId).send({
      title: "EDITED",
      images: ["1", "2"],
      caption:
        "TEST EDIT TEST EDIT",
      UserId: 1,
    });
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "successfully updated"
    );
  });

  //! put post id 404
  it("id not found", async () => {
    const response = await request(app).put(`/posts/1000`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "not found");
  });

  // delete post id 200
  it.only("Successfully delete posts by id", async () => {
    const response = await request(app).delete(`/posts/`+postId);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "successfully deleted"
    );
  });

  //! delete post id 404
  it("Unsuccess delete posts by id, because id not found", async () => {
    const response = await request(app).delete(`/posts/10`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "not found");
  });
});


