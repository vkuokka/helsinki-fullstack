const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

blogsRouter.post('/blogs', (request, response) => {
	if (!request.body.title || !request.body.url) {
		return response.status(400).end()
	}
	!request.body.likes ? request.body.likes = 0 : 0
	const blog = new Blog(request.body)
	blog.save().then((result) => {
		response.status(201).json(result)
	})
})

module.exports = blogsRouter
