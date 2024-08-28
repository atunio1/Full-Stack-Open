const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two users', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('addition of new user', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
  })

  test('invalid username or password', async () => {
    const newUser = {
      username: 'test1',
      name: 'test1',
      password: 'te'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const newUser2 = {
      username: 'te',
      name: 'test1',
      password: 'test1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)  
  })
})

after(async () => {
  await mongoose.connection.close()
})