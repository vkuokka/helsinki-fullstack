import React from 'react'
import personService from './services/person'

const Add = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage}) => {
	const addName = (event) => {
		event.preventDefault(event)
		if (persons.filter(person => person.name === newName).length !== 0) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
				const modifiedObject = {...persons.find(person => person.name === newName), number : newNumber}
				personService.update(modifiedObject)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.name !== returnedPerson.name ? person : returnedPerson))
						setMessage({text: `Changed ${modifiedObject.name} number`, type: 'success'})
					})
					.catch(error => setMessage(
						{text: `Information of ${modifiedObject.name} has already been removed from server`, type: 'failure'}
					))
					setTimeout (() => setMessage({message: null, type: null}), 3000)
			}
		}
		else {
			const personObject = {
				name: newName,
				number: newNumber
			}
			personService.create(personObject)
				.then(returnedPerson => setPersons(persons.concat(returnedPerson)))
			setMessage({text: `Added ${personObject.name}`, type: 'success'})
			setTimeout (() => setMessage({message: null, type: null}), 3000)
		}
	  setNewName('')
	  setNewNumber('')
	}
	const handleNewName = (event) => setNewName(event.target.value)
	const handleNewNumber = (event) => setNewNumber(event.target.value)
	return (
		<div>
			<form onSubmit={addName}>
			  <div> name: <input value={newName} onChange={handleNewName}/> </div>
			  <div> number: <input value={newNumber} onChange={handleNewNumber}/> </div>
			  <div> <button type="submit">add</button> </div>
			</form>
		</div>
	)
}

export default Add
