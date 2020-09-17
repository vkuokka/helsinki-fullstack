import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Add from './components/add'
import List from './components/list'
import personService from './components/services/person'
import Notification from './components/notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)

  const hook = () => {
    personService.getAll()
      .then(list => setPersons(list))
  }
  useEffect(hook, [])
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} error={error}/>
        <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
        <h2>add a new</h2>
        <Add persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage} setError={setError}/>
        <h2>Numbers</h2>
        <List persons={persons} setPersons={setPersons} newFilter={newFilter} setMessage={setMessage} />
    </div>
  )
}

export default App
