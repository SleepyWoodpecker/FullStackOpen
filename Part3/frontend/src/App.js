import { useEffect, useState } from "react";
import DB from "./Services.jsx";
import MessageBox from "./components/MessageBox.jsx";
import PhonebookFilter from "./components/PhonebookFilter";
import NumberTable from "./components/NumberTable";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [messageBoxContent, setMessageBoxContent] = useState({});

  useEffect(() => {
    DB.getAllEntries().then((persons) => setPersons(persons));
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneInput = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterSearch(e.target.value);
  };

  const clearFields = () => {
    setTimeout(() => {
      setMessageBoxContent({
        ...messageBoxContent,
        message: null,
      });
    }, 5000);
    setNewName("");
    setPhoneNumber("");
  };

  const handleNewName = (e) => {
    e.preventDefault();
    for (const person of persons) {
      if (
        person.name === newName &&
        window.confirm(
          `${newName} is already in the phonebook, replace their number?`
        )
      ) {
        DB.updateEntry({ ...person, number: phoneNumber })
          .then((response) => {
            setPersons(
              persons.map((listPerson) =>
                listPerson.id !== response.id ? listPerson : response
              )
            );
            setMessageBoxContent({
              color: "green",
              message: `${newName}'s number has been updated`,
            });
          })
          .catch((err) => {
            console.log(err);
            setMessageBoxContent({
              color: "red",
              message: `${err.response.data}`,
            });
          });

        clearFields();
        return;
      }
    }

    DB.addEntry({ name: newName, number: phoneNumber })
      .then((response) => {
        console.log(`new person has been added`);
        setPersons(persons.concat(response));
        setMessageBoxContent({
          color: "green",
          message: `${newName}'s number has been added`,
        });
      })
      // at the end of the day, should just pass the error message all the way to the front end to handle
      .catch((err) => {
        console.log(err);
        setMessageBoxContent({
          color: "red",
          message: `${err.response.data.message}`,
        });
      });

    clearFields();
  };

  const deleteUser = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      DB.deleteEntry(person.id)
        .then((response) => {
          setPersons(
            persons.filter((listPerson) => response.id !== listPerson.id)
          );
        })
        .catch((err) => {
          setMessageBoxContent({
            color: "red",
            message: `Information on ${person.name} has already been deleted from the server`,
          });
          clearFields();
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <MessageBox messageBoxContent={messageBoxContent} />
      <PhonebookFilter
        filterSearch={filterSearch}
        handleFilter={handleFilter}
      />
      <h3>add a new</h3>
      <form onSubmit={handleNewName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          phone number:{" "}
          <input value={phoneNumber} onChange={handlePhoneInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <NumberTable
        filterSearch={filterSearch}
        persons={persons}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default App;
