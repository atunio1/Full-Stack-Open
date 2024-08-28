const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful 1',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 100,
      __v: 0
    },
  ]

  test('when list has many blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 125)
  })
})

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Go To Statement Considered Harmful 1',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Go To Statement Considered Harmful 2',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Go To Statement Considered Harmful 3',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 100,
    __v: 0
  },
]

describe('favourite blog', () => {
  test('favourite blog should have most likes', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    assert.deepStrictEqual(result, listWithManyBlogs[2])
  })
})

describe('author with most blog posts', () => {
  test('author with the most blog posts 1', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 3 })
  })

  listWithManyBlogs.push({
    _id: '5a422aa71b54a676234d17f1',
    title: 'Test',
    author: 'Asra',
    url: 'test.pdf',
    likes: 99,
    __v: 0
  })

  test('author with the most blog posts 2', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 3 })
  })

})


describe('author with most likes', () => {
  test('author with the most likes', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 125 })
  })
})
