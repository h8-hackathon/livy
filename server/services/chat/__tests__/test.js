const { User, AdminPost, CounselorSubmission, Report, sequelize } = require('../models');
const request = require("supertest");
const app = require("../app");
const { connect, Chat } = require("../mongo");

beforeAll(async () => {
  try {
    await User.create({
      id: 1,
      name: 'admin1',
      email: 'admin1@gmail.com',
      gender: 'F',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg',
      role: 'superadmin',
      helpful: 4,
    });
    await User.create({
      id: 2,
      name: 'conselor',
      email: 'conselor@gmail.com',
      gender: 'F',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg',
      role: 'counselor',
      helpful: 4,
    });
    await AdminPost.bulkCreate([
      {
        id: 1,
        title: 'Mental health: build predictive models to steer policy',
        url: 'https://www.nature.com/articles/d41586-021-02581-9',
        caption: 'Combine economic, social and medical data to forecast need and design services to address the growing crisis.',
        type: 'Article',
        UserId: 1,
      },
    ]);
    await CounselorSubmission.create({
      id: 2,
      status: 'Pending',
      submissions: 'https://www.nature.com/articles/d41586-021-02581-9',
      UserId: 1,
    });
   
    await Chat.insertOne({
      UserId: 1,
      CounselorId: 2,
      chats: [{
        time: new Date(),
        text : 'ohayou'

      }]
    })



  } catch (error) {
    console.log(error, 'ini errornya');
  }
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete(
    'Users',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  await sequelize.queryInterface.bulkDelete(
    'AdminPosts',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
  await sequelize.queryInterface.bulkDelete(
    'CounselorSubmissions',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );

});

describe('for posts', () => {
  // chats read 200
  it('Successfully read chats', async () => {
    const response = await request(app).get('/chats/1');
    expect(response.status).toBe(200);
    console.log(response.body)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('_id', expect.any(String));
    expect(response.body).toHaveProperty('UserId', expect.any(Number));
    expect(response.body).toHaveProperty('CounselorId', expect.any(Number));
    expect(response.body.chats).toBeInstanceOf(Array);
    expect(response.body.chats[0]).toHaveProperty('time', expect.any(String));
    expect(response.body.chats[0]).toHaveProperty('text', expect.any(String));
  });
  // chats read 404
  it.only('Failed read chats', async () => {
    const response = await request(app).get('/chats/abc');
    expect(response.status).toBe(404);
    console.log(response.body)
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Document Not Found');
  
  });

  

  
});
