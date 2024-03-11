import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(1) // 0:error 1:success

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedBlogappUser)
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const getBlogs = async () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
      console.log('response:',exception.response.data)
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

    console.log('duration',)
    setTimeout(() => {
      setMessage(null)
    }, duration === undefined ? 5000 : duration * 5000)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.createBlog({
        title, author, url
      })

      setBlogs(blogs.concat(blog))
      showMessage(`a new blog ${blog.title} by ${blog.author} added`, 1)
    } catch (exception) {
      showMessage(exception.response.date.error, 0)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <Notification message={message} messageType={messageType} />
      <div>
        username<input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password<input value={password} type='password' onChange={handlePasswordChange} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <>
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          title<input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author<input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url<input value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  const bloglists = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message} messageType={messageType} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      {createBlogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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

