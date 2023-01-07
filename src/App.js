import { useState, useEffect } from "react";
import personService from './services/persons'
import Person from './components/Person'
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
      });
  }, []);



  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  
  let arrayToShow = []
  
  if(filter.length > 0){
    arrayToShow = persons.filter((persona) => {
      return (
        persona.name.toLowerCase().slice(0, filter.length) ===
        filter.toLowerCase()
      );
    });
  }else{
    arrayToShow = persons
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleRepeatedValues()) {
      return;
    }
    const objectToAdd = {
      name: newName,
      number: newPhone,
    };

    personService
      .create(objectToAdd)
      .then(response => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewPhone("");
      })
    
  };

  const handleRepeatedValues = () => {
    const isItRepeated = persons.filter((person) => person.name === newName);

    if (isItRepeated.length !== 0) {
      alert(`${newName} already exist`);
      return true;
    }
    return false;
  };

  const deleteNote = (id) => {
    if(window.confirm("Do you really want to delete it ")){
      const url = `http://localhost:3001/persons/${id}`
      const personToDelete = 
      persons.find(person => person.id === id)
      
      personService
        .deletePerson(id, personToDelete)
        .then(() => (
          setPersons(persons.filter(p => p.id !== id))
        ))
    }
   

  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter: <input onChange={handleChangeFilter} value={filter} />
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input onChange={handleChangeName} value={newName} />
          <br />
          Phone: <input onChange={handleChangePhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {arrayToShow.map((person) => (
          <Person 
            key={person.id} 
            person={person}
            deleteNote={() => deleteNote(person.id)}
            />
        ))}
      </div>
    </div>
  );
};

export default App;
