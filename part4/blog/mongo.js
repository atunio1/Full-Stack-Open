// File used for testing only
const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://part4:${password}@cluster0.2ztj934.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

if (process.argv.length > 3) {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: 0
  })

  blog.save().then(() => {
    console.log(`Added ${blog.title} by ${blog.author} to database.`)
    mongoose.connection.close()
  })
} else {
  Blog.find({}).then(result => {
    console.log('blogs:')
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
}
