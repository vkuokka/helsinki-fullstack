const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
	try {
		const blogs = await Blog.find({})
		return response.json(blogs)
	}
	catch(expection) {
		return response.status(500).end()
	}
	
})

blogsRouter.post('/blogs', async (request, response) => {
	if (!request.body.title || !request.body.url) {
		return response.status(400).end()
	}
	!request.body.likes ? request.body.likes = 0 : 0
	const blog = new Blog(request.body)
	try {
		const result = await blog.save()
		return response.status(201).json(result)
	}
	catch (exception) {
		return response.status(500).end()
	}
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
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
