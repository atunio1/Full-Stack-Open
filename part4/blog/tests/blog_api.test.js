const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
var loggedInToken

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const response = await api
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret'
    })
  loggedInToken = response.body.token
})

describe('when there is initially some blogs saved', () => {

  /* Test 1 */
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  /* Test 2 */
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })


  /* Test 3 */
  test('unique itendifier property is named id', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    assert('id' in blogsAtEnd[0])
  })

})


describe('addition of new blog', () => {
  /* Test 4 */
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Asra',
      url: 'asynctest.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('async/await simplifies making async calls'))
  })

  /* Test 5 */
  test('blog with no likes property added', async () => {
    const newBlog = {
      title: 'checking likes',
      author: 'Asra',
      url: 'test.com'
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
  })

  /* Test 6 */
  test('url or title properties missing', async () => {
    const newBlog = {
      author: 'Asra',
      url: 'test.com'
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const newBlog2 = {
      title: 'missing URL',
      author: 'Asra',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

    /* Test 6 */
    test('user authentication missing', async () => {
      const newBlog = {
        title: 'missing user token',
        author: 'Asra',
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

})

describe('deleting a blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const savedUser = await User.find({ username: 'root' })

    const newBlog = new Blog({
      title: 'Testing blog deletion from root user',
      author: 'test',
      url: 'test.com',
      likes: 10,
      user: savedUser[0]._id
    })

    await newBlog.save()
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(r => r.id)
    assert(!ids.includes(blogToDelete.id))
  })

  test('fails with status code 400 if id is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete('/api/blogs/1')
      .set({ Authorization: `Bearer ${loggedInToken}`})
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updating a blog', () => {

  test('updates number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send( { likes: 10 })
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[0].likes, 10)
  })
})

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  
})

after(async () => {
  await mongoose.connection.close()
})