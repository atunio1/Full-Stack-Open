import Togglable from '../components/Togglable'

const Blog = ({ blog, handleLikes, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = (event) => {
    event.preventDefault()
    const blogObject = { ...blog, likes: blog.likes + 1 }
    handleLikes(blogObject)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    handleDelete(blog.id)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} <br />
        {blog.author} <br />
        <Togglable buttonLabel='view' cancelButtonLabel='hide'>
          {blog.url} <br/>
          likes {blog.likes} <button onClick={updateBlog}>like</button><br/>
          <button onClick={deleteBlog}>delete</button> <br/>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog