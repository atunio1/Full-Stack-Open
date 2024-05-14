import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase()) 
    
    if (duplicate) {
      if (duplicate.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
      }
      else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = {
            ... duplicate,
            number: newNumber,
          }

          personService
            .update(updatedPerson.id, updatedPerson)
            .then(returnedPerson =>
              {
                setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson))
              })
            }
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePersonWith = id => {
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
        )
        .catch(error => {
          alert(
            `The person ${person.name} was already deleted.`
          )
          setPersons(persons.filter(person => person.id !== id))
        }) 
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
        <Persons persons={persons} newSearch={newSearch} deletePerson={deletePersonWith} />
    </div>
  )
}

export default App