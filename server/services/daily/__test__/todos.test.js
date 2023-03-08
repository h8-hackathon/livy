const request = require('supertest')
const app = require('../app')
const Todo = require('../mongo/models/Todo')

afterAll(async () => {
  await Todo.deleteMany({ UserId: 100 })
})

describe('Api Daily', () => {
  describe('post /todos', () => {

    it('responds with code 400 and body ', async () => {
      const todos = {
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: false
          },
          {
            activity: "satu",
            completed: false
          }
        ]
      }

      const res = await request(app).post('/todos').send(todos)
      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "UserId must be an number and is required")

    })

    it('responds with code 400 and body ', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: {}
      }

      const res = await request(app).post('/todos').send(todos)
      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "todos must be an array")

    })

    it('responds with code 200 and list todos ', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: false
          },
          {
            activity: "satu",
            completed: false
          }
        ]
      }

      const res = await request(app).post('/todos').send(todos)
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty("message", "successfully created")

    })
  })

  describe('GET /todos/:userId', () => {

    it('responds with code 400 and body ', async () => {
      const res = await request(app).get('/todos/asd')
      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty("message", "Params must a number and required")

    })

    it('responds with code 200 and body ', async () => {
      const res = await request(app).get('/todos/100')
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty("UserId", 100)
      expect(res.body).toHaveProperty("_id", expect.any(String))
      expect(res.body).toHaveProperty("todos", expect.any(Array))
      expect(res.body.todos[0]).toHaveProperty("activity", expect.any(String))
      expect(res.body.todos[0]).toHaveProperty("completed", expect.any(Boolean))
    })
  })

  describe('PUT /todos/:userId', () => {

    it('responds with code 404 Not Found', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: false
          },
        ]
      }
      const res = await request(app).put('/todos/asd').send(todos)
      expect(res.statusCode).toBe(404)
      expect(res.body).toHaveProperty("message", "Document Not Found")
    })

    it('responds with code 200 success updated', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: true
          },
        ]
      }
      const res = await request(app).put('/todos/100').send(todos)
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty("message", "successfully updated")
    })
  })

  describe('DELETE /todos/:userId', () => {

    it('responds with code 404 Not Found', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: false
          },
        ]
      }
      const res = await request(app).delete('/todos/asd')
      expect(res.statusCode).toBe(404)
      expect(res.body).toHaveProperty("message", "Document Not Found")
    })   

    it('responds with code 200', async () => {
      const todos = {
        userId: 100,
        updatedAt: new Date(),
        todos: [
          {
            activity: "satu",
            completed: false
          },
        ]
      }
      const res = await request(app).delete('/todos/100')
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty("message", "successfully deleted")
    })   
  })
})