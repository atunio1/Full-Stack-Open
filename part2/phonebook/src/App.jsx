import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const resultsToShow = persons.filter(({ name }) => name.toLowerCase().slice(0,newSearch.length) === newSearch.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()

    const duplicate = persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase()) 

    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Filter Functionality */}
        <Filter newSearch={newSearch} handleSearch={handleSearch} />

      {/* New Entry Functionality */}
      <h3>Add a new</h3>
        <PersonForm {...{addPerson, newName, handleNameChange, newNumber, handleNumberChange}}/>

      {/* Display Phone Book */}
      <h3>Numbers</h3>
        <Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App