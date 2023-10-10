import React from "react";

function IndividualRecord({ person, deleteUser }) {
  return (
    <div>
      <h6 style={{ display: "inline-block", paddingRight: "5px" }}>
        {person.name} {person.number}
      </h6>
      <button onClick={() => deleteUser(person)}>delete</button>
    </div>
  );
}

export default IndividualRecord;
