import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

const personList = persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNewName}/> </div>
        <div> number: <input value={newNumber} onChange={handleNewNumber}/> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      {personList}
    </div>
  )

}

export default App
