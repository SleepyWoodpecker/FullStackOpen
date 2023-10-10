import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks";

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useForm("text");
  const { reset: resetAuthor, ...author } = useForm("text");
  const { reset: resetInfo, ...info } = useForm("text");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
    props.showMessage(`a new anecdote ${content.value} created!`, 5000);
  };
  const resetFields = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
