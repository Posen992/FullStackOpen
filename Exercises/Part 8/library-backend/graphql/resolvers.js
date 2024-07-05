const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require('../mongoDB/bookSchema')
const Author = require('../mongoDB/authorSchema.js')
const User = require('../mongoDB/userSchema.js')

const resolvers = {
	Book: {
		author: async (root) => {
			const author = await Author.findById(root.author)
			return author
		},
	},

	Author: {
		bookCount: async (root) => {
			return root.books.length
		},
	},

	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			const filter = {}

			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				if (author) {
					filter.author = author._id
				} else {
					return []
				}
			}

			if (args.genre) {
				filter.genres = args.genre
			}
			const books = Book.find(filter).populate('author')
			return books
		},
		authorCount: () => Author.collection.countDocuments(),
		allAuthors: async () => {
			const result = Author.find({}).populate('books')
			return result
		},
		me: async (root, args, context) => {
			return context.currentUser
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			let author = await Author.findOne({ name: args.author})

			if (!author) {
				const newAuthor = new Author({ name: args.author })

				author = await newAuthor.save().catch((error) => {
					throw new GraphQLError(error.message, {
						extensions: {
							code: 'BAD_AUTHOR_INPUT',
							invalidArgs: args.author,
							error,
						},
					})
				})
			}

			let book = new Book({ ...args, author: author._id })

			book = await book.save().catch((error) => {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_BOOK_INPUT',
						invalidArgs: args.title,
						error,
					},
				})
			})

			author.books.push(book._id)
			await author.save()

			pubsub.publish('BOOK_ADDED', { bookAdded: book })

			return book
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			return await Author.findOneAndUpdate(
				{ name: args.name },
				{ born: args.setBornTo },
				{ new: true }
			).catch((error) => {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_BOOK_INPUT',
						invalidArgs: args.title,
						error,
					},
				})
			})

			return book
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			})

			return user.save().catch((error) => {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.SECRET) }
		},
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
}

module.exports = resolvers
