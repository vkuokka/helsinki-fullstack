import React from 'react'

const Add = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
	const addName = (event) => {
		event.preventDefault(event)
		if (persons.filter(person => person.name === newName).length !== 0) {
			window.alert(`${newName} is already added to phonebook`)
		}
		else {
			const personObject = {
			name: newName,
			number: newNumber
			}
			setPersons(persons.concat(personObject))
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
