import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PERSON, ALL_PERSONS } from "../queries";

function AddNewPerson() {
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (err) => {
      const messages = err.graphQLErrors.map((e) => e.message).join("\n");
      console.log(messages);
    },
  });
  const handleCreateNewPerson = async (e) => {
    e.preventDefault();
    const newPerson = await createPerson({
      variables: {
        name: "SW",
        phone: "123",
        street: "Up yours",
        city: "SINGAPORE",
      },
    });
    console.log(newPerson);
  };
  return (
    <div>
      <button onClick={handleCreateNewPerson}>Create you</button>
    </div>
  );
}

export default AddNewPerson;
