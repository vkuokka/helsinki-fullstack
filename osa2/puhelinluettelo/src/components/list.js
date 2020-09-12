import React from 'react'

const List = ({persons, newFilter}) => {
	const personList = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
	.map(person => <p key={person.name}>{person.name} {person.number}</p>)
	return (
		<div>
    		{personList}
		</div>
	)
}

export default List
