const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs } = require('./test_helper')
const test_helper = require('./test_helper')
const { json, response } = require('express')
const { templateSettings } = require('lodash')
const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
	await User.deleteMany({})
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

describe('Blog manipulation', () => {

	test('Blog with specific id is deleted', async () => {	
		let response = await api.get('/api/blogs').expect(200)
		const blogs = response.body
		await api.delete(`/api/blogs/${blogs[0].id}`).expect(204)
		response = await api.get('/api/blogs').expect(200)
		expect(response.body.length).toEqual(blogs.length - 1)
		response.body.forEach(blog => {
			expect(blog.title).not.toContain(blogs[0].title)
		})
	})
})

test('Specific blog is updated', async () => {
	let response = await api.get('/api/blogs').expect(200)
	const blogs = response.body
	blogs[0].likes += 1
	await api.put(`/api/blogs/${blogs[0].id}`).send(blogs[0]).expect(200)
	response = await api.get('/api/blogs').expect(200)
	expect(response.body.find(blog => blog.title === blogs[0].title).likes).toEqual(8)
})

describe('User manipulation', () => {

	test('user created successfully', async () => {
		const user = {
			user: 'Tester Testings',
			username: 'user',
			password: 'password'
		}
		await api.post('/api/users').send(user).expect(201)
		const response = await api.get('/api/users').expect(200)
		expect(response.body.find( user => user.user == 'Tester Testings')).toBeDefined()
	})

	test('username too short', async () => {
		const user = {
			user: 'Tester Testings',
			username: 'a',
			password: 'password'
		}
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('requirements not met')
	})

	test('password too short', async () => {
		const user = {
			user: 'Tester Testings',
			username: 'user',
			password: 'a'
		}
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('password too short')
	})

	test('missing password', async () => {
		const user = {
			user: 'Tester Testings',
			username: 'user',
		}
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('missing content')
	})

	test('missing username', async () => {
		const user = {
			user: 'Tester Testings',
			password: 'password'
		}
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('missing content')
	})

	test('missing user', async () => {
		const user = {
			username: 'user',
			password: 'password'
		}
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('missing content')
	})

	test('username not unique', async () => {
		const user = {
			user: 'Tester Testings',
			username: 'user',
			password: 'password'
		}
		await api.post('/api/users').send(user).expect(201)
		const response = await api.post('/api/users').send(user).expect(400)
		expect(response.body.error).toContain('requirements not met')
	})
})

afterAll(() => {
	mongoose.connection.close()
})
