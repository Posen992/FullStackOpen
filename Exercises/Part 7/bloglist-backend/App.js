const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

require('express-async-errors')
const blogRouter = require('./controllers/blog_router')
const userRouter = require('./controllers/user_router')
const loginRouter = require('./controllers/login_router')
const commentRouter = require('./controllers/comment_router')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'test') {
	console.log('test')
	const testRouter = require('./controllers/test_router')
	app.use('/api/test', testRouter)
}

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/comment',middleware.userExtractor, commentRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
