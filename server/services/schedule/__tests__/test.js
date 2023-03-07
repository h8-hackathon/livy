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

let counselorToBeDeleted
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
    let note = "add schedule";
    const response = await request(app)
      .post("/schedules/user/" + userId)
      .send({ CounselorId, time, note });
    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("paymentUrl", expect.any(String));
 
  });

  // post schedule by user id 500
  it("Failed post schedule by user id because invalid user id", async () => {
    let userId = 1000; //!
    let CounselorId = 2;
    let time = new Date();
    let note = "add schedule";
    const response = await request(app)
      .post("/schedules/user/" + userId)
      .send({ CounselorId, time, note });
    expect(response.status).toBe(500);
    // console.log(response.body);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

  // post schedule by user id 500
  it("Failed post schedule by user id because invalid counselor id", async () => {
    let userId = 1; //!
    let CounselorId = "abc";
    let time = new Date();
    let note = "add schedule";
    const response = await request(app)
      .post("/schedules/user/" + userId)
      .send({ CounselorId, time, note });
    expect(response.status).toBe(500);
    // console.log(response.body);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });

  // patch paid schedule by external_id 404
  it("Failed patch paid schedule because invalid external_id", async () => {
    let external_id = "abc";
    const response = await request(app).post("/schedules/paid/" + external_id);
    expect(response.status).toBe(404);
  });

  // success create availability
  it("Suceess creating availability", async () => {
    let counselorId = 2;
    let userId = 1;
    const response = await request(app)
      .post("/schedules/counselor/" + counselorId + "/availability")
      .send({
        UserId: userId,
        availability: [
          {
            dayOfWeek: "thursday",
            slots: [
              {
                startTime: "17:00",
                endTime: "19:00",
              },
            ],
          },
          {
            dayOfWeek: "friday",
            slots: [
              {
                startTime: "20:00",
                endTime: "23:00",
              },
            ],
          },
        ],
      });
    expect(response.status).toBe(200);
    // console.log(response.body);
    expect(response.body).toHaveProperty("message", "successfully created");
  });

  // success get availability 
  it("Suceess get availability", async () => {
    let counselorId = 1
    const response = await request(app)
    .get("/schedules/counselor/" + counselorId + "/availability")
    expect(response.status).toBe(200);
    // console.log(response.body);
    counselorToBeDeleted = response.body._id.toString();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body.availability).toBeInstanceOf(Array);
    expect(response.body.availability[0]).toBeInstanceOf(Object);
    expect(response.body.availability[0]).toHaveProperty("dayOfWeek", expect.any(String));
  });

  // failed get availability because invalid counselor id 
  it("failed get availability", async () => {
    let counselorId = 'abc'
    const response = await request(app)
      .get("/schedules/counselor/" + counselorId + "/availability")
    expect(response.status).toBe(404);
    // console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message","No documents matched the query");
  });

  // failed get availability because invalid counselor id 
  it("failed get availability", async () => {
    let counselorId = 1000
    const response = await request(app)
      .get("/schedules/counselor/" + counselorId + "/availability")
    expect(response.status).toBe(404);
    // console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message","No documents matched the query");
  });

// success update availability
it("Suceess update availability", async () => {
  let counselorId = 2;
  let userId = 1;
  const response = await request(app)
    .put("/schedules/counselor/" + counselorId + "/availability")
    .send({
      UserId: userId,
      availability: [
        {
          dayOfWeek: "sunday",
          slots: [
            {
              startTime: "20:00",
              endTime: "23:00",
            },
          ],
        },
      ],
    });
  expect(response.status).toBe(200);
  // console.log(response.body);
  expect(response.body).toHaveProperty("message", "successfully updated");
});

// success delete availability
it("Suceess delete availability", async () => {
  let counselorId = counselorToBeDeleted
  const response = await request(app)
    .delete("/schedules/counselor/" + counselorId + "/availability")
  expect(response.status).toBe(200);
  // console.log(response.body);
  expect(response.body).toHaveProperty("message", "successfully deleted");
});

// failed delete availability
it("failed delete availability", async () => {
  let counselorId = 'abcd'
  const response = await request(app)
    .delete("/schedules/counselor/" + counselorId + "/availability")
  expect(response.status).toBe(500);

});


});
