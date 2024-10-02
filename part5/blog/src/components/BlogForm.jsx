import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newURL}
          name="URL"
          onChange={({ target }) => setNewURL(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm