_ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
}

const favouriteBlog = (blogs) => {
	return blogs.reduce((mostLiked, blog) => {
		return mostLiked == null || mostLiked.likes < blog.likes
			? blog
			: mostLiked
	}, null)
}

const mostBlogs = (blogs) => { }

const mostLikes = (blogs) => { }

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}
