import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { Query_AllBooks } from '../services/bookServices'
import { Query_Me } from '../services/loginServices'

const Recommend = () => {
	const [books, setBooks] = useState([])
	const booksResult = useQuery(Query_AllBooks)
	const meResult = useQuery(Query_Me)

	useEffect(() => {
		if (
			meResult.data &&
			booksResult.data &&
			booksResult.data.allBooks.length > 0
		) {
			setBooks(
				booksResult.data.allBooks.filter((book) => {
					if (book.genres.includes(meResult.data.me.favoriteGenre)) {
						return book
					}
				})
			)
		}
	}, [booksResult.data])

	if (booksResult.loading || meResult.loading) {
		return <div>loading...</div>
	}

	const boldTextStyle = {
		fontWeight: 'bold',
	}

	return (
		<>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre{' '}
				<span style={boldTextStyle}>{meResult.data.me.favoriteGenre}</span>
			</p>

			<Table striped>
				<thead>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default Recommend
