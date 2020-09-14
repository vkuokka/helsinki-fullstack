import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Add from './components/add'
import List from './components/list'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
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
