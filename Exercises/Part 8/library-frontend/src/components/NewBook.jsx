import { useState } from 'react'
import { Query_AddBook, Query_AllBooks } from '../services/bookServices'
import { useMutation } from '@apollo/client'
import { useField } from '../hooks/index'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import {
	showErrorNotificaition,
	showSuccessNotificaition,
} from '../reducers/notificationReducer'

import { Button } from 'react-bootstrap'

const NewBook = (props) => {
	const dispatch = useDispatch()

	const title = useField('text')
	const author = useField('text')
	const published = useField('number')
	const genre = useField('text')
	const [genres, setGenres] = useState([])

	const [addBook] = useMutation(Query_AddBook, {
		refetchQueries: [{ query: Query_AllBooks }],

		onError: (error) => {
			if (error && error.graphQLErrors.length > 0) {
				dispatch(showErrorNotificaition(error.graphQLErrors[0].message))
			}
		},

		onCompleted: () => {
			dispatch(showSuccessNotificaition('Book added'))

			title.reset()
			published.reset('')
			author.reset('')
			setGenres([])
			genre.reset()
		},
	})


	const submit = async (event) => {
		event.preventDefault()

		addBook({
			variables: {
				title: title.value,
				author: author.value,
				published: Number(published.value),
				genres,
			},
		})
	}

	const addGenre = () => {
		setGenres(genres.concat(genre.value))
		genre.reset()
	}

	return (
		<div>
			<Notification />
			<form onSubmit={submit}>
				<div>
					title
					<input {...title.tagProps()} />
				</div>
				<div>
					author
					<input {...author.tagProps()} />
				</div>
				<div>
					published
					<input {...published.tagProps()} />
				</div>
				<div>
					<input {...genre.tagProps()} />
					<Button onClick={addGenre} type="button">
						add genre
					</Button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<Button type="submit">create book</Button>
			</form>
		</div>
	)
}

export default NewBook
