import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      phone: '000-111-222'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }


  const handleChangePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const arrayToRender = persons.map((person, index) => (
    <p key={person.name}>{person.name} - {person.phone}</p>
  ))


  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (handleRepeatedValues()) {
      return
    }

    const objectToAdd = {
      name: newName,
      phone: newPhone,
    }
    
    setPersons(persons.concat(objectToAdd))
    setNewName("")
    setNewPhone("")
  }



  const handleRepeatedValues = () => {
    const isItRepeated = persons.filter(person => person.name === newName)

    
    if(isItRepeated.length !== 0){
      alert(`${newName} already exist`)
      return true
    }
    return false
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input onChange={handleChangeName} value={newName}/>
          <br/>
          Phone: <input onChange={handleChangePhone} value={newPhone}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{arrayToRender}</div>
      
    </div>
  )
}

export default App