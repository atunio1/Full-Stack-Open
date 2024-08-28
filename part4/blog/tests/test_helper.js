const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Test Blog',
    author: 'Asra',
    url: 'test.com',
    likes: 0
  },
  {
    title: 'Test Blog 2',
    author: 'Tunio',
    url: 'test2.com',
    likes: 10
  },
]

const initialUsers = [
  { 
    username: 'asra',
    name: 'Asra',
    passwordHash: 'test'
  },
  {
    username: 'bilal',
    name: 'Bilal',
    passwordHash: 'test'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb,
}