import { useState, useEffect, useRef } from 'react'

//Components
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

//Services
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  //message useState
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(1) // 0:error 1:success
  //login useState
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //blog useState
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //useRef
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  },[])

  const getBlogs = async () => {
    blogService.getAll().then(newBlogs => {
      resortBlogs(newBlogs)
    })
  }

  const resortBlogs = (prevBlogs) => {
    const sortedBlogs = [...prevBlogs]
    sortedBlogs.sort((item1, item2) => item2.likes - item1.likes)
    setBlogs(sortedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
    } catch (exception) {
      showMessage(exception.response.data.error, 0)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const showMessage = (message, messageType, duration) => {
    setMessage(message)
    setMessageType(messageType)

    setTimeout(() => {
      setMessage(null)
    }, duration === undefined ? 5000 : duration * 5000)
  }

  const createBlog = async blogObject => {
    try {
      const blog = await blogService.createBlog(blogObject)
      blogFormRef.current.toggleVisibility()
      console.log(blog)
      setBlogs(blogs.concat(blog))
      showMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`, 1)
    } catch (exception) {
      showMessage(exception.response.data.error, 0)
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    try {
      const blog = await blogService.updateBlog(blogId.toString(), blogObject)
      const newblogs = blogs.map((item) => {
        return item.id === blog.id ? blog : item
      })

      resortBlogs(newblogs)
    } catch (exception) {
      showMessage(exception.response.data.error, 0)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId.toString())
      const newblogs = blogs.filter((item) => item.id !== blogId)
      resortBlogs(newblogs)
    } catch (exception) {
      showMessage(exception.response.data.error, 0)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <Notification message={message} messageType={messageType} />
      <div>
        username<input value={username} onChange={handleUsernameChange} data-testid='username' />
      </div>
      <div>
        password<input value={password} type='password' onChange={handlePasswordChange} data-testid='password'/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </>
  )

  const bloglists = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {createBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </>
  )

  return (
    <div>
      {user === null ? loginForm() : bloglists()}
    </div>
  )
}

const Notification = ({ messageType, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType === 1 ? 'success' : 'error'}>
      {message}
    </div>
  )
}

export default App

