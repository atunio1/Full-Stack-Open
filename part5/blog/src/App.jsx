import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newNotification, setNotification] = useState(null)
  const [newMessageType, setMessageType] = useState('success')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotification(`${username} sucessfully logged in!`)
      setMessageType('success')
      timeOut()
    } catch (exception) {
      setNotification('Wrong username or password.')
      setMessageType('error')
      timeOut()
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken('')
    setNotification('Successfully logged out.')
    setMessageType('success')
    timeOut()
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setNotification(`A new blog ${blogObject.title} by ${blogObject.author} created.`)
      setMessageType('success')
      timeOut()
    } catch (exception) {
      setNotification(`Blog ${blogObject.title} cannot be added.`)
      setMessageType('error')
      timeOut()
    }
  }

  const handleLikes = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (exception) {
      setNotification(`Blog could not be liked: ${exception.stack}`)
      setMessageType('error')
    }
  }

  const handleDelete = async (id) => {
    try {
      console.log(id)
      const blog = blogs.find((blog) => blog.id === id)
      if (window.confirm('Confirm if you want to delete this blog')) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification('Blog deleted')
        setMessageType('success')
        timeOut()
      }
    } catch (exception) {
      setNotification(`Blog could not be deleted: ${exception.stack}`)
      setMessageType('error')
    }
  }

  const timeOut = () => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={newNotification} messageType={newMessageType} />
        <Togglable buttonLabel='login' cancelButtonLabel='cancel'>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification message={newNotification} messageType={newMessageType} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>Logout</button>
      <Togglable buttonLabel='create blog' cancelButtonLabel='cancel' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default App