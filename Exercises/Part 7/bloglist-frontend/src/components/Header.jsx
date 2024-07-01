import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'

import { Nav, Navbar, Button } from 'react-bootstrap'
import blogService from '../services/blogs'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5,
  }

  const background = {
    padding: 5,
    backgroundColor: 'lightgray',
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(''))
    blogService.setToken(null)
    navigate('/login')
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link className="text-white" style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link className="text-white" style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <>
                  <em className="text-white" style={padding}>
                    {user.name} logged in
                  </em>
                  <Button size="sm" onClick={handleLogout}>
                    logout
                  </Button>
                </>
              ) : (
                <Link className="text-white" style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </>
  )
}

export default Header
