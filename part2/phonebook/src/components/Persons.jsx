const Person = ({ person, deletePerson }) => {
    return (
      <div>{person.name} {person.number} <button onClick={deletePerson}>delete</button></div>
    )
  }
  
const Persons = ({ persons, newSearch, deletePerson }) => {
    const resultsToShow = persons.filter(({ name }) => name.toLowerCase().slice(0,newSearch.length) === newSearch.toLowerCase())
    return (
        <div>
        {resultsToShow.map(person => 
            <Person 
              key={person.id} 
              person={person} 
              deletePerson={() => deletePerson(person.id)}
              />
            )}
        </div>
    )
}

export default Persons