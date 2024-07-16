const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const http = require('http')

const express = require('express')
const cors = require('cors')

const mongoDB = require('./mongoDB/mongo.js')
const jwt = require('jsonwebtoken')
const User = require('./mongoDB/userSchema.js')

const typeDefs = require('./graphql/schema.js')
const resolvers = require('./graphql/resolvers.js')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

mongoDB.connectMongoDB()

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const start = async () => {

	const app = express()
	const httpServer = http.createServer(app)

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})

	await server.start()

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
					const currentUser = await User.findById(decodedToken.id)
					return { currentUser }
				}
			},
		})
	)

	const PORT = 4000

	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`)
	})
}

start()
