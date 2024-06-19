const testRouter = require('express').Router()
const Blog = require('../models/blog_model')
const User = require('../models/user_model')

testRouter.post('/reset', async (request, response) => {
	console.log('reset')
	await Blog.deleteMany({})
	await User.deleteMany({})

	response.status(204).end()
})

module.exports = testRouter