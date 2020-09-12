import React, { useState } from 'react'
import Filter from './components/filter'
import Add from './components/add'
import List from './components/list'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
        <h2>add a new</h2>
        <Add persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
        <h2>Numbers</h2>
        <List persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
