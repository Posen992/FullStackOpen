import { Table } from 'react-bootstrap'
import {
	Query_AllBooks,
	Subscription_BookAdded,
} from '../services/bookServices'
import { useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import NewBook from './NewBook'

const Books = () => {
	const [genres, setGenres] = useState([])
	const booksResult = useQuery(Query_AllBooks)

	useSubscription(Subscription_BookAdded, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded
			window.alert(`${addedBook.title} added`)

			client.cache.updateQuery({ query: Query_AllBooks }, ({ allBooks }) => {
				console.log('updateQuery')
				return {
					allBooks: allBooks.concat(addedBook),
				}
			})
		},
	})

	useEffect(() => {
		if (genres.length == 0) {
			if (booksResult.data && booksResult.data.allBooks.length > 0) {
				const allGenres = booksResult.data.allBooks
					.map((book) => book.genres)
					.flat()
				const uniqueGenres = [...new Set(allGenres)]
				setGenres(uniqueGenres)
			}
		}
	}, [booksResult.data])

	if (booksResult.loading) {
		return <div>loading...</div>
	}

	const handleGenre = (event) => {
		if (event.target.textContent === 'all genres') {
			booksResult.refetch({ selectedGenre: '' })
		} else {
			booksResult.refetch({ selectedGenre: event.target.textContent })
		}
	}

	return (
		<div>
			<h2>books</h2>
			<Table striped>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksResult.data.allBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</Table>

			<div className="btn-group" role="group" aria-label="Basic example">
				{genres.map((genre) => (
					<button
						key={genre}
						type="button"
						className="btn btn-secondary"
						onClick={handleGenre}
					>
						{genre}
					</button>
				))}

				<button
					type="button"
					className="btn btn-secondary"
					onClick={handleGenre}
				>
					all genres
				</button>
			</div>

			<NewBook />
		</div>
	)
}

export default Books
