import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

function EditBirthYear({ authors }) {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [editAuthorQuery] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleAuthorEdit = (e) => {
    e.preventDefault();
    editAuthorQuery({ variables: { name, setBornTo: Number(birthYear) } });
    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <form onSubmit={handleAuthorEdit}>
        <div>
          name
          <select value={name} onChange={(e) => setName(e.target.value)}>
            <option value=""></option>
            {authors.map((author) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          birth year
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          ></input>
        </div>

        <button onClick={handleAuthorEdit}>Update Author</button>
      </form>
    </div>
  );
}

export default EditBirthYear;
