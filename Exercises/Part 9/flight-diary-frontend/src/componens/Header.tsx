import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="#" as="span">
						<Link className="text-white" to="/diaryList">
							diaryList
						</Link>
					</Nav.Link>
					<Nav.Link href="#" as="span">
						<Link className="text-white" to="/addDiary">
							add Diary
						</Link>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Header
