import React from 'react'
import '../index.css'

const Notification = ({message, error}) => {
	if (message === null && error === null) {
		return null
	}
	if (message) {
		return (
			<div className="success">
				{message}
			</div>
		)
	}
	if (error) {
		return (
			<div className="failure">
				{error}
			</div>
		)
	}
}

export default Notification
