const Person = ({ person }) => {
    return (
      <div>{person.name} {person.number}</div>
    )
  }
  
const Persons = ({ persons, newSearch }) => {
    const resultsToShow = persons.filter(({ name }) => name.toLowerCase().slice(0,newSearch.length) === newSearch.toLowerCase())
    return (
        <div>
        {resultsToShow.map(person => 
            <Person key={person.id} person={person} />
            )}
        </div>
    )
}

export default Persons