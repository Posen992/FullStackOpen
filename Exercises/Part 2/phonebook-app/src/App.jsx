import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFliter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFliter(event.target.value)
  }


  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event)
 
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 2
    }
    console.log(newPerson)
    if (persons.find(item => item.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Fliter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
       <PersonForm onSubmit={addPerson} name={newName} nameOnChange={handleNameChange} number={newNumber} numberOnChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

const Fliter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with<input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({onSubmit,name,nameOnChange,number,numberOnChange}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={nameOnChange} />
        </div>
        <div>
          number: <input value={number} onChange={numberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({persons}) => {
  return (
    <ul>
    {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
  </ul>
  )
}

export default App