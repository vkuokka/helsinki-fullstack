const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const body = request.body

	if (!body.user || !body.username || !body.password) {
		return response.status(400).json({ error: 'missing content' })
	}
	if (body.password.length < 3) {
		return response.status(400).json({ error: 'password too short' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		user: body.user,
		username: body.username,
		passwordHash,
	})

	try {
		await user.save()
	}
	catch (error){
		return response.status(400).json({ error: 'requirements not met' })
	}

	response.status(201).end()
})

usersRouter.get('/', async (request, response) => {
	try {
		const users = await User.find({})
		return response.json(users)
	}
	catch (exception) {
		return response.status(500).end()
	}
})
module.exports = usersRouter
