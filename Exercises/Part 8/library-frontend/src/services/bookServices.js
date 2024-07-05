import { gql } from '@apollo/client'

const Fragment_BookDetails = gql`
	fragment BookDetails on Book {
		title
		author {
			name
			born
			bookCount
		}
		published
		genres
	}
`

export const Query_AllBooks = gql`
	query findBooksByGenre($selectedGenre: String) {
		allBooks(genre: $selectedGenre) {
			...BookDetails
		}
	}

	${Fragment_BookDetails}
`

export const Query_AllAuthors = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const Query_AddBook = gql`
	mutation AddBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}

	${Fragment_BookDetails}
`

export const Query_EditAuthor = gql`
	mutation EditAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

export const Subscription_BookAdded = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}

	${Fragment_BookDetails}
`
