const request = require('supertest');
const app = require('../app');
const { User, AdminPost, CounselorSubmission, Report, sequelize } = require('../models');

beforeAll(async () => {
  try {
    await User.create({
      name: 'admin1',
      email: 'admin1@gmail.com',
      gender: 'F',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg',
      role: 'superadmin',
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
    await Report.create({
      postId: 'string',
      commentId: 'string',
      ReporterId: 2,
    });
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
  await sequelize.queryInterface.bulkDelete(
    'Reports',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe('for post', () => {
  it('Successfully read posts', async () => {
    const response = await request(app).get('/posts');
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('title', 'Mental health: build predictive models to steer policy');
    expect(response.body[0]).toHaveProperty('url', expect.any(String));
  });

  it('Successfully post posts', async () => {
    const response = await request(app).post('/posts').send({
      id: 6,
      title: 'Mental health: build predictive models to steer policy',
      url: 'https://www.nature.com/articles/d41586-021-02581-9',
      caption: 'Combine economic, social and medical data to forecast need and design services to address the growing crisis.',
      type: 'Article',
      UserId: 1,
    });
    console.log(response);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Success created Mental health: build predictive models to steer policy');
  });

  it('Successfully get posts id', async () => {
    const response = await request(app).get('/posts/6');
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });
});
