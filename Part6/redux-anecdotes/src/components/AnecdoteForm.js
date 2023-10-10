import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const actionFeedback = (feedback, duration) => {
    dispatch(setNotification(feedback, duration));
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    const content = e.target.newPost.value;
    dispatch(newAnecdote(content));
    actionFeedback("Created a new post", 5000);
    e.target.newPost.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewPost}>
        <div>
          <input name="newPost" />
        </div>
        {/* the onSubmit handler can be triggered by making the button have a submit type */}
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
