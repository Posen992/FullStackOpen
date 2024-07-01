import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { setUser } from './reducers/userReducer'
import { setBlogs, groupBlogsByAuthor } from './reducers/blogListReducer'
import { showSuccessNotificaition } from './reducers/notificationReducer'

// //Components
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserDetail from './components/UserDetail'
import UserList from './components/UserList'
import Header from './components/Header'
import BlogDetail from './components/BlogDetail'
import Notification from './components/Notification'

import { Alert } from 'react-bootstrap'

// //Services
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)
  const [isRecentlyLoggedIn, setIsRecentlyLoggedIn] = useState(false)

  useEffect(() => {
    handleUserInfo()
  }, [])

  useEffect(() => {
    getBlogs()
  }, [user])

  useEffect(() => {
    if (isRecentlyLoggedIn) {
      dispatch(showSuccessNotificaition(`welcome ${user.name}`))
      setIsRecentlyLoggedIn(false)
    }
  }, [isRecentlyLoggedIn])

  const loginSuccess = () => {
    navigate('/')
    setIsRecentlyLoggedIn(true)
    handleUserInfo()
  }

  const handleUserInfo = () => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedBlogappUser) {
      const userJSON = JSON.parse(loggedBlogappUser)
      dispatch(setUser(userJSON))
      blogService.setToken(userJSON.token)
    } else {
      dispatch(setUser(''))
      navigate('/login')
    }
  }

  const getBlogs = async () => {
    if (user) {
      blogService.getAll().then((newBlogs) => {
        dispatch(setBlogs(newBlogs))
        dispatch(groupBlogsByAuthor())
      })
    }
  }

  return (
    <div className="container">
      {notification.message && (
        <Alert variant={notification.type}> {notification.message}</Alert>
      )}
      <Routes>
        <Route
          path="/login"
          element={<LoginForm loginSuccess={loginSuccess} />}
        />
        <Route path="/" element={<Header />}>
          <Route index element={<BlogList />} />
          <Route path="blogs/:blogId" element={<BlogDetail />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetail />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
