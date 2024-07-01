import { useDispatch } from 'react-redux'

import { showErrorNotificaition } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'

import loginService from '../services/loginService'

import { Form, Button, Container } from 'react-bootstrap'

const LoginForm = ({ loginSuccess }) => {
  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      dispatch(setUser(user))
      loginSuccess()
    } catch (exception) {
      dispatch(showErrorNotificaition(exception.response.data.error))
    }
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <Form.Group>
          <Form.Label> username</Form.Label>
          <Form.Control
            {...username.tagProps()}
            data-testid="username"
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label> password</Form.Label>
          <Form.Control
            {...password.tagProps()}
            data-testid="password"
          ></Form.Control>
        </Form.Group>
        <Button type="submit">login</Button>
      </Form>
    </Container>
  )
}

export default LoginForm
