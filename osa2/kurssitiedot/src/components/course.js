import React from "react"

const Header = ({course}) => {
	return (
	  <h2>{course.name}</h2>
	)
}
  
const Content = ({course}) => {
	const info = course.parts.map(value => <p key={value.id}>{value.name} {value.exercises}</p>)
	return (
		<div>
		  {info}
		</div>
	)
}

const Total = ({course}) => {
	const totalAmount = course.parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<p><strong>total of {totalAmount} exercises</strong></p>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</div>
	)
}

export default Course
