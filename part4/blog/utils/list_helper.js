const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => { 
  return blogs.reduce((accumulator, blog) => accumulator += blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  })
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const blogsByAuthor = _.map(authorCounts, (value, key) => {
    return {
      author: key,
      blogs: value
    }
  })
  return _.maxBy(blogsByAuthor, 'blogs')
}

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, 'author')
  const likesByAuthor = _.map(groupedBlogs, (authorBlogs) => {
    const totalLikes = _.sumBy(authorBlogs, 'likes')
    return {
      author: authorBlogs[0].author,
      likes: totalLikes
    }
  })
  return _.maxBy(likesByAuthor, 'likes')
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}