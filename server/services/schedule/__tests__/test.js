const {
  User,
  AdminPost,
  CounselorSubmission,
  Report,
  Schedule,
  sequelize,
} = require("../models");
const request = require("supertest");
const app = require("../app");
const { connect, Chat } = require("../mongo");

beforeAll(async () => {
  try {
    await User.create({
      id: 1,
      name: "admin1",
      email: "admin1@gmail.com",
      gender: "F",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg",
      role: "superadmin",
      helpful: 4,
    });
    await User.create({
      id: 2,
      name: "counselor",
      email: "conselor@gmail.com",
      gender: "F",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg",
      role: "counselor",
      helpful: 4,
    });
    await Schedule.create({
      status: "paid",
      CounselorId: 2,
      UserId: 1,
      time: new Date(),
      note: "apayaaa",
      session: "2023-03-07 14:59:05.400 +0700",
      expPaymentUrl: "2023-03-05 14:59:05.400 +0700",
      paymentUrl:
        "https://checkout-staging.xendit.co/web/64071c9332260d834f1136ec",
      rating: 5,
    });
  } catch (error) {
    console.log(error, "ini errornya");
  }
});

afterAll(async () => {
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
    "Schedules",
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe("for schedule", () => {
  // schedule read by counselor id 200
  it("Successfully read schedule by counselor id", async () => {
    let counselorId = 2;
    const response = await request(app).get(
      "/schedules/counselor/" + counselorId
    );
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CounselorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("paymentUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty(
      "expPaymentUrl",
      expect.any(String)
    );
    expect(response.body[0].User).toBeInstanceOf(Object);
    expect(response.body[0].User).toHaveProperty("name", expect.any(String));
  });

  // schedule read by user id 200
  it("Successfully read schedule by user id", async () => {
    let userId = 1;
    const response = await request(app).get("/schedules/user/" + userId);
    expect(response.status).toBe(200);
    // console.log(response.body);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CounselorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("paymentUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty(
      "expPaymentUrl",
      expect.any(String)
    );
    expect(response.body[0].Counselor).toBeInstanceOf(Object);
    expect(response.body[0].Counselor).toHaveProperty(
      "name",
      expect.any(String)
    );
  });

  // post schedule by user id 200
  it("Successfully post schedule by user id", async () => {
    let userId = 1;
    let CounselorId = 2;
    let time = new Date();
    let note = 'add schedule'
    const response = await request(app)
      .post("/schedules/user/" + userId)
      .send({ CounselorId, time, note });
    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.response).toHaveProperty("status", expect.any(String));
    expect(response.body.response).toHaveProperty("UserId", expect.any(Number));
    expect(response.body.response).toHaveProperty("session", expect.any(String));
    expect(response.body.response).toHaveProperty("note", expect.any(String));
    expect(response.body.response).toHaveProperty("CounselorId", expect.any(Number));
    expect(response.body.response).toHaveProperty(
      "paymentUrl",
      expect.any(String)
      );
    expect(response.body.response).toHaveProperty(
      "expPaymentUrl",
      expect.any(String)
    );
  });

  // post schedule by user id 500
  it("Failed post schedule by user id because invalid user id", async () => {
    let userId = 1000; //!
    let CounselorId = 2;
    let time = new Date();
    let note = 'add schedule'
    const response = await request(app)
    .post("/schedules/user/" + userId)
    .send({ CounselorId, time, note });
    expect(response.status).toBe(500);
    // console.log(response.body);
    expect(response.body).toHaveProperty("message", 'Internal Server Error');
  });

  // post schedule by user id 500
  it("Failed post schedule by user id because invalid counselor id", async () => {
    let userId = 1; //!
    let CounselorId = 'abc';
    let time = new Date();
    let note = 'add schedule'
    const response = await request(app)
    .post("/schedules/user/" + userId)
    .send({ CounselorId, time, note });
    expect(response.status).toBe(500);
    // console.log(response.body);
    expect(response.body).toHaveProperty("message", 'Internal Server Error');
  });

  // patch paid schedule by external_id 404
  it("Failed patch paid schedule because invalid external_id", async () => {
    let external_id = 'abc';
    const response = await request(app)
    .post("/schedules/paid/" + external_id)
    expect(response.status).toBe(404);
  });


});
