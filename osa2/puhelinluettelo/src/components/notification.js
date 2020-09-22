import React from 'react'
import '../index.css'

const Notification = ({message}) => {
	if (!message.text) {
		return null
	}
	else if (message.type === 'success') {
		return (
			<div className="success">
				{message.text}
			</div>
		)
	}
	else if (message.type === 'failure') {
		return (
			<div className="failure">
				{message.text}
			</div>
		)
	}
}

export default Notification
