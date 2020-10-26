const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { eventNames } = require('../models/user')


blogsRouter.get('/blogs', async (request, response) => {
	try {
		const blogs = await Blog.find({}).populate('user')
		return response.json(blogs)
	}
	catch(expection) {
		return response.status(500).end()
	}
	
})

blogsRouter.post('/blogs', async (request, response) => {
	const body = request.body

	if (!body.title || !body.url) {
		return response.status(400).end()
	}
	!body.likes ? body.likes = 0 : 0

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await User.findById(decodedToken.id)
	if (user) {
		body.user = user._id
	}
	
	const blog = new Blog(body)
	try {
		const savedBlog = await blog.save()
		if (user) {
			user.blogs = user.blogs.concat(savedBlog._id)
			await user.save()
		}
		return response.status(201).json(savedBlog)
	}
	catch (exception) {
		return response.status(500).end()
	}
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id).populate('blogs')

	if (!user || !user.blogs.find( blog => blog.id === request.params.id)) {
		return response.status(401).json({ error: 'unauthorized access'})
	}

	try {
		await Blog.findByIdAndRemove(request.params.id)
		return response.status(204).end()
	}
	catch (exception) {
		return response.status(500).end()
	}
})

blogsRouter.put('/blogs/:id', async (request, response) => {
	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}
	try {
		await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		return response.send(200).end()
	}
	catch (exception) {
		return response.status(500).end()
	}
})

module.exports = blogsRouter
