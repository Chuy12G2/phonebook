import { useState, useEffect } from "react";
import personService from './services/persons'
import Person from './components/Person'
import Notification from "./components/Notification";

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
  const [notification, setNotification] = useState(null)

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
        setNotification(`${response.name} was addes succesfully`)
      })
      setTimeout(() => {
        setNotification(null)
      }, 3000);
    
  };

  const handleRepeatedValues = () => {
    const isItRepeated = persons.filter((person) => person.name === newName);

    if (isItRepeated.length !== 0) {
      setNotification(`${newName} already exist`)
      setTimeout(() => {
        setNotification(null)
      }, 3000);;
      return true;
    }
    return false;
  };

  const deleteNote = (id) => {
    if(window.confirm("Do you really want to delete it ")){
      const personToDelete = 
      persons.find(person => person.id === id)
      
      personService
        .deletePerson(id, personToDelete)
        .then(() => { 
          setNotification(`${personToDelete.name} was deleted succesfully`)
          setPersons(persons.filter(p => p.id !== id))
    }).catch(
      error => {
        setNotification(
          `${personToDelete.name} was already removed from the server`
        )
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, 3000)
    }
   

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div className="notification-container">
        <Notification message={notification}/>
      </div>
      <span>Filter:</span> <input onChange={handleChangeFilter} value={filter} />
      <form onSubmit={handleSubmit}>
        <h2>Add a New Contact</h2>
        <div>
         <span>Name:</span> <input onChange={handleChangeName} value={newName} />
          <br />
          <span>Phone: </span><input onChange={handleChangePhone} value={newPhone} />
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
