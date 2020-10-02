const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

describe('get requests', () => {
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
})

describe('post requests', () => {
	test('new blog can be added', async () => {
		const blog = {
			"title": "Testing the app",
			"author": "Tester Testings",
			"url": "404",
			"likes": 0
		}
		await api.post('/api/blogs').send(blog)
			.expect(201)
		const response = await api.get('/api/blogs').expect(200)
		expect(response.body).toHaveLength(initialBlogs.length + 1)
		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Testing the app')
	})

	test('server inits likes', async () => {
		const blog = {
			"title": "Testing the app",
			"author": "Tester Testings",
			"url": "404",
		}
		await api.post('/api/blogs').send(blog)
			.expect(201)
		const response = await api.get('/api/blogs').expect(200)
		response.body.forEach(blog => {
			expect(blog.likes).toBeDefined()
		})
	})
})

describe('put requests', () => {
	test('modify blog from database', async () => {
		let response = await api.get('/api/blogs/').expect(200)
		const initialLikes = response.body[0].likes
		response.body[0].likes += 1
		await api.put(`/api/blogs/${response.body[0].id}`).send(response.body[0]).expect(200)
		response = await api.get('/api/blogs/').expect(200)
		expect(response.body[0].likes.toString()).toContain((initialLikes + 1).toString())
	})
})

describe('delete requests', () => {
	test('delete specific blog from database', async () => {
		let response = await api.get('/api/blogs').expect(200)
		await api.delete(`/api/blogs/${response.body[0].id}`).expect(204)
		response = await api.get('/api/blogs').expect(200)
		expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
	})
})

describe('error cases', () => {
	test('server responds bad request if title is not set', async () => {
		const blog = {
			"author": "Tester Testings",
			"url": "404",
		}
		await api.post('/api/blogs').send(blog)
			.expect(400)
	})

	test('server responds bad request if url is not set', async () => {
		const blog = {
			"title": "Testing the app",
			"author": "Tester Testings",
		}
		await api.post('/api/blogs').send(blog)
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
