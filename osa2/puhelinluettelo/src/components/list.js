import React from 'react'
import personService from './services/person'

const List = ({persons, setPersons, newFilter, setMessage}) => {
	const remove = (person) => {
		if (window.confirm(`Delete ${person.name} ?`)) {
			personService.remove(person.id)
				.then(returnedPerson => {
					setPersons(persons.filter(x => x.id !== person.id))
				})
			setMessage(`Removed ${person.name}`)
			setTimeout(() => setMessage(null), 3000)
		}
	}
	const personList = persons
		.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
		.map(person => {
			return (
				<p key={person.name}>
				{person.name} {person.number}
				<button onClick={() => remove(person)}>delete</button>
				</p>
			)
		})
	return (
		<div>
    		{personList}
		</div>
	)
}

export default List
