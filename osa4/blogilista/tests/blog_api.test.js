const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('all initial blogs are returned as json', async () => {
	const response = await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id can be found from blog object', async () => {
	const response = await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
	mongoose.connection.close()
})
