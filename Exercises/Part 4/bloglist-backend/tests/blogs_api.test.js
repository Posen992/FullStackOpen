const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')

const Blog = require('../models/blog_model')
const helper = require('./helper/blogs_api_helper.test')

const app = require('../App')
const supertest = require('supertest')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('blogs are returned in Json format', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
	const response = await api.get('/api/blogs')
	const blog = new Blog(response.body[0])
	assert(Object.keys(blog.toJSON()).includes('id'), 'the unique identifier property of the blog posts is named id')
})

test('the blog is added into database', async () => {
	const response = await api
		.post('/api/blogs')
		.send(helper.newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

	let addedBlog = new Blog(response.body)
	addedBlog = addedBlog.toJSON()
	const titlesInDb = blogsAtEnd.map(blog => blog.title)
	assert(titlesInDb.includes(addedBlog.title), 'the blog is not added into database')
})

test('blogs without likes is added with a default value 0', async () => {
	const response = await api
		.post('/api/blogs')
		.send(helper.newBlogWithoutLikes)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.likes, 0)
})

describe('a blog without title or url is not added', () => {
	test('a blog without title is not added ', async () => {
		await api
			.post('/api/blogs')
			.send(helper.newBlogWithoutTitle)
			.expect(400)

		const blogsInDb = await helper.blogsInDb()

		assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
	})

	test('a blog without url is not added ', async () => {
		await api
			.post('/api/blogs')
			.send(helper.newBlogWithoutUrl)
			.expect(400)

		const blogsInDb = await helper.blogsInDb()

		assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
	})
})

describe('delete a blog', () => {
	test('a blog is deleted with existing id', async () => {
		await api.delete(`/api/blogs/${helper.existingId}`).expect(204)

		const blogsIdDb = await helper.blogsInDb()
		assert.strictEqual(blogsIdDb.length, helper.initialBlogs.length - 1)
	})

	test('a blog is not deleted with non-existing id', async () => {
		await api.delete(`/api/blogs/${helper.nonExistingId}`).expect(400)

		const blogsIdDb = await helper.blogsInDb()
		assert.strictEqual(blogsIdDb.length, helper.initialBlogs.length)
	})
})


test('update blog likes to 100', async () => {
	const updateBlog = helper.initialBlogs[0]

	const blog = {
		title: updateBlog.title,
		author: updateBlog.author,
		url: updateBlog.url,
		likes: 100
	}

	const response = await api
		.put(`/api/blogs/${updateBlog._id}`)
		.send(blog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(response.body.likes, 100)
})



after(async () => {
	await mongoose.connection.close()
})