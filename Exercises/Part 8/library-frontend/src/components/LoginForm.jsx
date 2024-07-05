import { Form, Button } from 'react-bootstrap'
import { Query_Login } from '../services/loginServices'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showErrorNotificaition } from '../reducers/notificationReducer'
import { setToken } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
	const [login, LoginResult] = useMutation(Query_Login, {

        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
            dispatch(showErrorNotificaition(error.graphQLErrors[0].message))
        }
    })

	const onLogin = (event) => {
		event.preventDefault()
		const username = event.target.username.value
		const password = event.target.password.value

		login({
			variables: {
				username,
				password,
			},
		})
	}

    useEffect(() => {
        if (LoginResult.data) {
            const token = LoginResult.data.login.value
            localStorage.setItem('library-user-token', token)
            dispatch(setToken(token))
            navigate('/')
        }
	}, [LoginResult.data])

	return (
		<>
			<h1>Login in Library Application</h1>
            <Notification />
			<Form onSubmit={onLogin}>
				<Form.Group>
					<Form.Label>username</Form.Label>
					<Form.Control type="text" name="username" />
				</Form.Group>
				<Form.Group>
					<Form.Label>password</Form.Label>
					<Form.Control type="password" name="password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					login
				</Button>
			</Form>
		</>
	)
}

export default LoginForm
