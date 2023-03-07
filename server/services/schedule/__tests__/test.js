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
    await Schedule.create(
      {
        status: "paid",
        CounselorId: 2,
        UserId: 2,
        time: new Date(),
        note: "apayaaa",
        session: "2023-03-07 14:59:05.400 +0700",
        expPaymentUrl: "2023-03-05 14:59:05.400 +0700",
        paymentUrl: "https://checkout-staging.xendit.co/web/64071c9332260d834f1136ec",
        rating: 5
      }
    )

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
  it.only("Successfully read schedule by counselor id", async () => {
    let counselorId = 2
    const response = await request(app).get("/schedules/counselor/"+counselorId);
    expect(response.status).toBe(200);
    console.log(response.body)
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CounselorId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("paymentUrl", expect.any(String));
    expect(response.body[0]).toHaveProperty("expPaymentUrl", expect.any(String));
    expect(response.body[0].User).toBeInstanceOf(Object);
    expect(response.body[0].User).toHaveProperty("name", expect.any(String));
  });




});
