import React from "react";
import IndividualRecord from "./IndividualRecord";

function NumberTable({ filterSearch, persons, deleteUser }) {
  return (
    <div>
      <h2>Numbers</h2>
      {filterSearch.length === 0
        ? persons.map((person) => {
            return (
              <IndividualRecord
                person={person}
                key={person.name}
                deleteUser={deleteUser}
              />
            );
          })
        : persons.map((person) => {
            if (
              person.name.toUpperCase().includes(filterSearch.toUpperCase())
            ) {
              return (
                <IndividualRecord
                  person={person}
                  key={person.name}
                  deleteUser={deleteUser}
                />
              );
            }
          })}
    </div>
  );
}

export default NumberTable;
