const request = require('supertest');
const { app } = require('../app');
const { User, AdminPost, CounselorSubmission, Report, sequelize } = require('../models');

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
      id: 1,
      postId: 'string',
      commentId: 'string',
      ReporterId: 1,
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

describe('for posts', () => {
  // posts 200
  it('Successfully read posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('title', 'Mental health: build predictive models to steer policy');
    expect(response.body[0]).toHaveProperty('url', expect.any(String));
  });

  // post 201
  it('Successfully post posts', async () => {
    const response = await request(app).post('/posts').send({
      id: 6,
      title: 'Mental health: build predictive models to steer policy',
      url: 'https://www.nature.com/articles/d41586-021-02581-9',
      caption: 'Combine economic, social and medical data to forecast need and design services to address the growing crisis.',
      type: 'Article',
      UserId: 1,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Success created Mental health: build predictive models to steer policy');
  });

  // post 400 title is required
  it('title is required', async () => {
    const response = await request(app).post('/posts').send({
      id: 6,
      url: 'https://www.nature.com/articles/d41586-021-02581-9',
      caption: 'Combine economic, social and medical data to forecast need and design services to address the growing crisis.',
      type: 'Article',
      UserId: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'title is required');
  });

  // post 400 type is required
  it('type is required', async () => {
    const response = await request(app).post('/posts').send({
      id: 6,
      title: 'Mental health: build predictive models to steer policy',
      url: 'https://www.nature.com/articles/d41586-021-02581-9',
      caption: 'Combine economic, social and medical data to forecast need and design services to address the growing crisis.',
      UserId: 1,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'type is required');
  });

  // get posts id 200
  it('Successfully get posts by id', async () => {
    const response = await request(app).get('/posts/6');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', expect.any(Number));
  });

  // get post id 404
  it('posts id not found', async () => {
    const response = await request(app).get('/posts/1000');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });

  // put post id 200
  it('Successfully put posts by id', async () => {
    const response = await request(app).put(`/posts/1`);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Success updated Mental health: build predictive models to steer policy');
  });

  // put post id 404
  it('id not found', async () => {
    const response = await request(app).put(`/posts/1000`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });

  // delete post id 200
  it('Successfully delete posts by id', async () => {
    const response = await request(app).delete(`/posts/1`);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Success deleted Mental health: build predictive models to steer policy');
  });

  // delete post id 404
  it('Unsuccess delete posts by id, because id not found', async () => {
    const response = await request(app).delete(`/posts/10`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });
});

describe('for counselor', () => {
  // counselors 200
  it('Successfully read counselors', async () => {
    const response = await request(app).get('/counselors');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('status', expect.any(String));
  });

  // patch counselors 200
  it('Successfully patch counselor by id', async () => {
    const response = await request(app).patch(`/counselors/2`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Success updated status counselor');
  });

  // patch counselors id 404
  it('id not found', async () => {
    const response = await request(app).patch(`/counselors/1000`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });

  // delete counselors id 200
  it('Successfully delete counselors by id', async () => {
    const response = await request(app).delete(`/counselors/2`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Success deleted status counselor');
  });

  // delete counselors id 404
  it('Unsuccess delete counselors by id, because id not found', async () => {
    const response = await request(app).delete(`/counselors/10`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });
});

describe('for report', () => {
  // reports 200
  it('Successfully read reports', async () => {
    const response = await request(app).get('/reports');
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('postId', expect.any(String));
    expect(response.body[0]).toHaveProperty('commentId', expect.any(String));
    expect(response.body[0]).toHaveProperty('ReporterId', expect.any(Number));
  });

  // post report 201
  it('Successfully post reports', async () => {
    const response = await request(app).post('/reports').send({
      id: 6,
      postId: 'string',
      commentId: 'string',
      ReporterId: 1,
      note: 'uneducated',
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Success report');
  });

  // post 400 postId is required
  it('postId is required', async () => {
    const response = await request(app).post('/reports').send({
      id: 6,
      commentId: 'string',
      ReporterId: 1,
      note: 'uneducated',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'postId is required');
  });

  // post 400 commentId is required
  it('commentId is required', async () => {
    const response = await request(app).post('/reports').send({
      id: 6,
      postId: 'string',
      ReporterId: 1,
      note: 'uneducated',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'commentId is required');
  });

  // post 400 ReportedId is required
  it('ReportedId is required', async () => {
    const response = await request(app).post('/reports').send({
      id: 6,
      postId: 'string',
      commentId: 'string',
      note: 'uneducated',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'ReportedId is required');
  });

  // delete reports id 200
  it('Successfully delete reports by id', async () => {
    const response = await request(app).delete(`/reports/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Success deleted');
  });

  // delete reports id 404
  it('Unsuccess delete reports by id, because id not found', async () => {
    const response = await request(app).delete(`/reports/10`);
    console.log(response);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'not found');
  });
});
