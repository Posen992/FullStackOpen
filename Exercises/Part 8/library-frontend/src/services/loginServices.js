import { gql } from '@apollo/client'

export const Query_Login = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const Query_Me = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`
