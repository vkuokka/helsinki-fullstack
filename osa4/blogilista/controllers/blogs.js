const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
	try {
		const blogs = await Blog.find({})
		response.json(blogs)
	}
	catch (error) {
		console.error(error)
		response.status(500).end()
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
		response.status(201).json(result)
	}
	catch (error) {
		console.error(error)
		response.status(500).end()
	}
})

blogsRouter.put('/blogs/:id', async (request, response) => {
	const body = request.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.author,
		likes: body.likes
	}
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
		response.json(updatedBlog)
	}
	catch (error) {
		console.error(error)
		response.status(500).end()
	}
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
	try {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}
	catch (error) {
		console.error(error)
		response.status(500).end()
	}
})

module.exports = blogsRouter
