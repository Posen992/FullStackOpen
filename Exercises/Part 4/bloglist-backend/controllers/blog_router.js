const blogsRouter = require('express').Router()
const Blog = require('../models/blog_model')


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

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