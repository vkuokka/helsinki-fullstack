import React from "react"

const Header = ({course}) => {
	return (
	  <h1>{course.name}</h1>
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

const Course = ({course}) => {
	return (
		<div>
			<Header course={course} />
			<Content course={course} />
		</div>
	)
}

export default Course
