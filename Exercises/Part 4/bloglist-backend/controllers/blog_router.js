const blogsRouter = require('express').Router()
const Blog = require('../models/blog_model')
const User = require('../models/user_model')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

	const { url, author, title } = request.body
	console.log(request.user)
	const user = await User.findById(request.user.id)

	const blog = new Blog({
		url,
		author,
		title,
		user:user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 }))
})

blogsRouter.delete('/:id', async (request, response) => {

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const blog = await Blog.findById(request.params.id)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	if (blog.user.toString() !== decodedToken.id) {
		return response.status(401).json({ error: ' only the creator can delete ' })
	}

	await Blog.findByIdAndDelete(request.params.id)

	const user = await User.findById(decodedToken.id)
	user.blogs.splice(blog._id)
	await user.save()

	response.status(204).end()
})

// blogsRouter.delete('/', async (request, response) => {


// 	await Blog.deleteMany({})
// 	response.status(204).end()
// })

blogsRouter.put('/:id', async (request, response) => {

	const body = request.body

	const blog = {
		title: body.title,
		url: body.url,
		author: body.author,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { runValidator: true, new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter