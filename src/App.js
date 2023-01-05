import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const filteredArray = persons.filter((persona) => {
    return (
      persona.name.toLowerCase().slice(0, filter.length) ===
      filter.toLowerCase()
    );
  });

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const fullArrayToRender = persons.map((person) => (
    <p key={person.name}>
      {person.name} - {person.number}
    </p>
  ));

  const filteredArrayToRender = filteredArray.map((person) => (
    <p key={person.name}>
      {person.name} - {person.number}
    </p>
  ));

  const arrayToRender =
    filteredArray.length === 0 ? fullArrayToRender : filteredArrayToRender;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (handleRepeatedValues()) {
      return;
    }

    const objectToAdd = {
      name: newName,
      number: newPhone,
    };

    setPersons(persons.concat(objectToAdd));
    setNewName("");
    setNewPhone("");
  };

  const handleRepeatedValues = () => {
    const isItRepeated = persons.filter((person) => person.name === newName);

    if (isItRepeated.length !== 0) {
      alert(`${newName} already exist`);
      return true;
    }
    return false;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      FIlter: <input onChange={handleChangeFilter} value={filter} />
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
        {filteredArray.length === 0 && filter
          ? "No coincidences found"
          : arrayToRender}
      </div>
    </div>
  );
};

export default App;
