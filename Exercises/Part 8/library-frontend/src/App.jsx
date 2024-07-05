import { useEffect, useState } from 'react'

import { Routes, Route, useNavigate, Link } from 'react-router-dom'

import { Nav, Navbar } from 'react-bootstrap'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { clearToken, setToken } from './reducers/userReducer'
import Recommend from './components/Recommend'

const App = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const padding = {
		paddingRight: 5,
	}

	useEffect(() => {
		dispatch(setToken(localStorage.getItem('library-user-token')))
	}, [])

	const handleLogout = () => {
		console.log
		window.localStorage.removeItem('library-user-token')
		dispatch(clearToken())
		navigate('/login')
	}

	const LoginButton = () => {
		return (
			<Nav.Link href="#" as="span">
				<Link className="text-white" style={padding} to="/login">
					login
				</Link>
			</Nav.Link>
		)
	}

	const LogoutButton = () => {
		return (
			<Nav.Link href="#" as="span">
				<Link
					className="text-white"
					style={padding}
					to="/login"
					onClick={handleLogout}
				>
					logout
				</Link>
			</Nav.Link>
		)
	}

	return (
		<div className="Container">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#" as="span">
							<Link className="text-white" style={padding} to="/authors">
								authors
							</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link className="text-white" style={padding} to="/">
								books
							</Link>
						</Nav.Link>
						{user.token !== '' && (
							<>
								<Nav.Link href="#" as="span">
									<Link className="text-white" style={padding} to="/newbook">
										add book
									</Link>
								</Nav.Link>

								<Nav.Link href="#" as="span">
									<Link className="text-white" style={padding} to="/recommend">
										recommend
									</Link>
								</Nav.Link>
							</>
						)}
						{user.token === '' ? <LoginButton /> : <LogoutButton />}
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Routes>
				<Route path="/authors" element={<Authors />} />
				<Route path="/" element={<Books />} />
				<Route path="/newbook" element={<NewBook />} />
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</div>
	)
}

export default App
