import { useEffect, useState } from 'react'
import { Query_AllAuthors, Query_EditAuthor } from '../services/bookServices'
import { Table, Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { useMutation, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import { showErrorNotificaition } from '../reducers/notificationReducer'
import Notification from './Notification'

const Authors = () => {
	const born = useField('number')
	const [selectedOption, setSelectedOption] = useState('')
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const authorsResult = useQuery(Query_AllAuthors)

	const [editAuthor] = useMutation(Query_EditAuthor, {
		refetchQueries: [{ query: Query_AllAuthors }],

		onError: (error) => {
			dispatch(showErrorNotificaition(error.graphQLErrors[0].message))
		},
	})

	useEffect(() => {
		console.log(1)
		if (authorsResult.data) {
			setSelectedOption(authorsResult.data.allAuthors[0].name)
		}
	}, [authorsResult])

	console.log('authors')

	if (authorsResult.loading) {
		return <div>loading...</div>
	}

	const onSubmit = (e) => {
		e.preventDefault()
		editAuthor({
			variables: {
				name: selectedOption,
				setBornTo: Number(born.value),
			},
		})
	}

	const margin = {
		margin: '10px',
	}

	return (
		<div>
			<h2>authors</h2>
			<Table striped>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authorsResult.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{user.token !== '' && (
				<>
					<h2>Set birthday</h2>
					<Notification />
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>name</Form.Label>
							<DropdownButton id="dropdown-basic-button" title={selectedOption}>
								{authorsResult.data.allAuthors.map((author) => (
									<Dropdown.Item
										key={author.name}
										onClick={() => setSelectedOption(author.name)}
									>
										{author.name}
									</Dropdown.Item>
								))}
							</DropdownButton>
						</Form.Group>
						<Form.Group>
							<Form.Label>born</Form.Label>
							<Form.Control {...born.tagProps()} />
						</Form.Group>
						<Button style={margin} type="submit">
							update author
						</Button>
					</Form>
				</>
			)}
		</div>
	)
}

export default Authors
