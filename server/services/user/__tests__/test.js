const request = require('supertest');
const app = require('../app');
const { User, CounselorSubmission, sequelize } = require('../models');

beforeAll(async () => {
  try {
    await User.create({
      id:999,
      name: 'ilias',
      email: 'ilias@mail.com',
      gender: 'M',
      dob:'2023-03-07T01:19:32.622Z',
      image: 'string image url testing purpose',
      role: 'superadmin',
      helpful: 20,
    });
    await CounselorSubmission.create({
      id: 2,
      status: 'Pending',
      submissions: 'string submission testing purpose',
      UserId: 999,
    });
  } catch (error) {
    console.log(error);
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
    'CounselorSubmissions',
    {},
    {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }
  );
});

describe('Succes Case For Users Service', () => {
  it('Successfully Get Users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body[0]).toHaveProperty('id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('email', 'ilias@mail.com');
    expect(response.body[0]).toHaveProperty('gender', 'M');
    expect(response.body[0]).toHaveProperty('dob', '2023-03-07T01:19:32.622Z');
    expect(response.body[0]).toHaveProperty('image', 'string image url testing purpose');
    expect(response.body[0]).toHaveProperty('role', 'superadmin');
    expect(response.body[0]).toHaveProperty('helpful', 20);
  });
  it('Successfully Get User By Id', async () => {
    const response = await request(app).get('/users/999');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id', expect.any(Number));
    expect(response.body).toHaveProperty('email', 'ilias@mail.com');
    expect(response.body).toHaveProperty('gender', 'M');
    expect(response.body).toHaveProperty('dob', '2023-03-07T01:19:32.622Z');
    expect(response.body).toHaveProperty('image', 'string image url testing purpose');
    expect(response.body).toHaveProperty('role', 'superadmin');
    expect(response.body).toHaveProperty('helpful', 20);
  });

  it('Successfully Post User (Its For Google Login)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'gilang@test.com',
        verified_email: true,
        name: 'testing purpose',
        given_name: 'Gilang',
        family_name: 'Ramadhan',
        picture: 'google.com',
        locale: 'id'
      },
      role: 'user'
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
  });
  it('Successfully Post User (Reject When User Role Is Admin if try to register)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'admin@test.com',
        verified_email: true,
        name: 'admin testing purpose',
        given_name: 'Gilang',
        family_name: 'Ramadhan',
        picture: 'google.com',
        locale: 'id'
      },
      role: 'admin'
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'InvalidCredentials');
  });
  it('Successfully Post User (Add To Counselor Submission when role is counselor)', async () => {
    const response = await request(app).post('/users/test').send({
      payload:{
        id: '114434339297979854205',
        email: 'counselor@test.com',
        verified_email: true,
        name: 'counselor testing purpose',
        given_name: '_',
        family_name: '_',
        picture: 'counselor.com',
        locale: 'id'
      },
      role: 'counselor'
    });
    const user = await User.findOne({where:{email:'counselor@test.com'}})
    const cs = await CounselorSubmission.findOne({where:{UserId:user.id}})
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
    expect(cs).toHaveProperty('status','pending')
  });

  it('Successfully Update User', async () => {
    const response = await request(app).put('/users/999').send({
    name: 'updated',
    email: 'updated@mail.com',
    gender: 'F',
    image: 'updated',
  });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'successfuly updated');
  });
  it('Successfully Patch User (increment or decrement helpful)', async () => {
    const response = await request(app).patch('/users/999').send({
      "helpful": 1,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message','successfuly updated');
  });
  it('Successfully Delete User', async () => {
    const response = await request(app).delete('/users/999');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message','successfuly deleted');
  });

});
/* 
describe('Failed Case For Users Service', () => {
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
}); */
